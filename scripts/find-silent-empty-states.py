# ---------------------------------------------------------------------------
# Find places where a failed read is rendered as "there is no data".
#
#   python scripts/find-silent-empty-states.py [src-dir]
#
# Asana 1218855318680702. Two pages were photographed two days apart saying "No
# partners found" while the records existed and the hub had returned them — the
# catch block emptied the list and the page drew its empty state. Before the hub
# tokens came out of the bundle (1218458529003876) that catch was nearly dead
# code, because a token baked into the JavaScript could not fail to be obtained.
# With server-issued sessions it fires on an ordinary day, so every one of these
# is now a live bug rather than a latent one.
#
# A hit is a `catch` block whose OWN BODY sets state to empty/zero/null WITHOUT
# also telling a human (swal / setLoadError / set*Error / toast / alert).
# Judge each one: a list the user is looking at must say it failed; a cache or a
# fire-and-forget log need not.
#
# Re-run this after adding a page that reads a backend.
# ---------------------------------------------------------------------------
import io
import os
import re
import sys

PAT_CATCH = re.compile(r'catch\s*\(')
EMPTY = re.compile(r'set[A-Za-z_]*\(\s*(\[\]|0|null)\s*\)')
# set\w*Error catches setLoadError, setReconnectError, setErr… — the first version of
# this script missed setReconnectError and reported a fixed page as still silent.
TELLS_USER = re.compile(r'swal|toast|alert\(|set[A-Za-z_]*Error')


def catch_body(text, start):
    """The catch block's own body, by brace matching. A fixed line window reported
    a storage guard next to an unrelated setPageNumber(0) as a hit; only what is
    actually inside the catch counts.

    `start` is just past `catch (`. Both forms have to work, because both occur here:
      try { … } catch (e) { setData([]) }        — block after the closing paren
      .catch((e) => { setData([]) })             — the arrow's own block, inside the parens
    A brace-less `.catch((e) => console.error(e))` has no body of its own and is
    skipped, instead of swallowing whatever function follows it."""
    depth, i, arrow_brace = 1, start, -1
    while i < len(text) and depth:
        c = text[i]
        if c == '(':
            depth += 1
        elif c == ')':
            depth -= 1
        elif c == '{' and arrow_brace == -1 and depth == 1:
            arrow_brace = i          # a block inside the catch's own parentheses
        i += 1
    if arrow_brace != -1:
        open_at = arrow_brace
    else:
        while i < len(text) and text[i] in ' \t\r\n':
            i += 1
        if i >= len(text) or text[i] != '{':
            return ''
        open_at = i
    depth, i = 0, open_at
    while i < len(text):
        if text[i] == '{':
            depth += 1
        elif text[i] == '}':
            depth -= 1
            if depth == 0:
                return text[open_at:i + 1]
        i += 1
    return text[open_at:]


def scan(root):
    silent, loud = [], 0
    for dirpath, _dirs, files in os.walk(root):
        if 'node_modules' in dirpath:
            continue
        for f in files:
            if not f.endswith(('.js', '.jsx')):
                continue
            path = os.path.join(dirpath, f)
            try:
                text = io.open(path, encoding='utf-8').read()
            except Exception:
                continue
            for m in PAT_CATCH.finditer(text):
                block = catch_body(text, m.end())
                hits = EMPTY.findall(block)
                if not hits:
                    continue
                rel = path.replace('\\', '/').replace(root.replace('\\', '/') + '/', '')
                line = text.count('\n', 0, m.start()) + 1
                if TELLS_USER.search(block):
                    loud += 1
                else:
                    silent.append((rel, line, ', '.join(sorted(set(hits)))))
    return silent, loud


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    root = args[0] if args else 'src'
    silent, loud = scan(root)
    print('scanned %s' % root)
    print('  empties state AND tells the user: %d' % loud)
    print('  empties state SILENTLY: %d' % len(silent))
    for rel, line, hits in sorted(silent):
        print('    %s:%s  -> %s' % (rel, line, hits))
    return 1 if silent else 0


if __name__ == '__main__':
    sys.exit(main())
