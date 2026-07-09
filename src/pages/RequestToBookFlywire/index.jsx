// -------------------------------------------------
// Flywire INSTANT return leg for the BookingPal reserve flow.
// The Flywire checkout redirects here (returnUrl = /request-to-book-flywire).
// Mirrors VT-FE PropertyReserve's return-leg useEffect: status-gated,
// idempotent, never trusts component state (fresh mount). On a referenced
// success it (a) creates the BP CHANNEL booking on the hub and (b) creates the
// reservation-of-record (VT-BE for VT, SHub for SH — via RESERVATION_API).
// Byte-identical across the VT and SH extranets; per-repo values via constants.
// -------------------------------------------------
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import AuthService from "../../services/auth.service";

const OPS_EMAIL = "reservations@villatracker.com";

const RequestToBookFlywire = () => {
  const history = useHistory();
  const [message, setMessage] = useState("Finalizing your booking…");

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const confirmation = params.get("confirmation");
      if (!confirmation) {
        setMessage("Nothing to process.");
        return;
      }

      const reference = params.get("reference");
      const status = params.get("status");
      const amount = params.get("amount");
      const payment_method = params.get("payment_method");
      const sig = params.get("sig");
      const ptype = params.get("ptype"); // 'instant'

      // A reservation is only created for an explicit, referenced success.
      if (status !== "success" || !reference) {
        if (status && status !== "success") {
          setMessage("Payment was not completed — no reservation was created and your card was not charged.");
          swal("Payment not completed", "No reservation was created and your card was not charged.", "error");
        } else {
          setMessage("Payment status unclear — please contact support.");
          swal(
            "Payment status unclear",
            `We could not confirm the payment result (confirmation ${confirmation}). Please contact ${OPS_EMAIL} before trying again — do NOT pay twice.`,
            "warning"
          );
        }
        return;
      }

      // Idempotency — set BEFORE any POST (guards React StrictMode double-invoke
      // and browser refreshes of the return page).
      const submittedKey = `flywireSubmitted_${confirmation}`;
      const guard = localStorage.getItem(submittedKey);
      if (guard === "done") {
        history.push("/reservations");
        return;
      }
      if (guard === "inflight") return;
      localStorage.setItem(submittedKey, "inflight");

      let pending = null;
      try {
        pending = JSON.parse(localStorage.getItem("bpPendingReservation"));
      } catch (e) { /* corrupted — handled as missing below */ }

      if (!pending) {
        // Reset the guard so a refresh re-shows this message instead of
        // silently short-circuiting on a stuck 'inflight'.
        localStorage.removeItem(submittedKey);
        setMessage("Payment received — booking needs attention.");
        swal(
          "Payment received — booking needs attention",
          `We received your payment confirmation (reference ${reference || confirmation}) but couldn't complete the booking in this browser. Please contact ${OPS_EMAIL} and do NOT pay again.`,
          "warning"
        );
        return;
      }

      try {
        // (a) Create the BP CHANNEL booking on the hub (idempotent on
        //     flywireCallbackId hub-side). Skip if a prior attempt already
        //     created it (addReservation failed after → we retry only step b).
        let confirmationId = pending.bpConfirmationId || "";
        let confirmationCode = pending.bpConfirmationCode || "";
        if (!pending.bpDone) {
          const bpResp = await AuthService.bpCreateReservation({
            listing_id: pending.listing_id,
            start_date: pending.start_date,
            nights: Number(pending.nights),
            number_of_guests: Number(pending.number_of_guests),
            total: Number(pending.netTotal),        // NET to the channel; guest was charged the up-sell
            currency: pending.currency,
            guest: pending.guest,
            flywireCallbackId: confirmation,
            flywireReference: reference,
          });
          const bpBody = bpResp?.data;
          if (bpBody && bpBody.success === false) {
            throw new Error(bpBody.detail?.message || bpBody.detail || bpBody.error || "BookingPal create failed");
          }
          const bpResult = bpBody?.result || {};
          confirmationId = bpResult.confirmation_id || "";
          confirmationCode = bpResult.confirmation_code || "";
          // Persist so a retry (after an addReservation failure) does NOT
          // re-book the channel — go straight to step (b).
          pending.bpDone = true;
          pending.bpConfirmationId = confirmationId;
          pending.bpConfirmationCode = confirmationCode;
          localStorage.setItem("bpPendingReservation", JSON.stringify(pending));
        }

        // (b) Create the reservation-of-record (RESERVATION_API), carrying the
        //     Flywire payment fields + the BP channel handles. flywireAmount
        //     stays the authoritative amount we asked Flywire to charge (set on
        //     the stored vtbe payload) — NOT the return-URL echo.
        const reservationPayload = {
          ...pending.vtbe,
          payment_type: "instant",
          flywireCallbackId: confirmation,
          flywireReference: reference,
          flywireStatus: status,
          flywireReturnAmount: amount,      // Flywire's return-URL echo (audit)
          flywirePaymentMethod: payment_method,
          flywireSig: sig,
          flywirePaymentStatus: "charged_pending_webhook",
          bpConfirmationId: confirmationId,
          bpConfirmationCode: confirmationCode,
        };
        const res = await AuthService.addReservation(reservationPayload);
        if (res?.status === 200 || res?.data) {
          localStorage.setItem(submittedKey, "done");
          localStorage.removeItem("bpPendingReservation");
          setMessage("Reservation completed. Redirecting…");
          history.push("/reservations");
        } else {
          throw new Error("add-reservation did not return success");
        }
      } catch (err) {
        console.error("Flywire return: booking completion failed", err);
        localStorage.removeItem(submittedKey); // allow a refresh to retry
        setMessage("We couldn't save your reservation — please contact support before paying again.");
        swal(
          "Reservation not saved",
          `Your payment reference is ${reference || confirmation}. Please contact ${OPS_EMAIL} before paying again — the card may already be charged.`,
          "error"
        );
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h3>{message}</h3>
    </div>
  );
};

export default RequestToBookFlywire;
