
import Layout from "../../components/Layout";

const partnersINVENIO = (props) => {

    const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props

    return(
        <Layout
            pageTitle="INVENIO PMs"
            agency={agency}
            agent={agent}
            token={token}
            screenSize={screenSize}
            activeMenu={activeMenu}
            handleToggleMenu={handleToggleMenu}
            setActiveMenu={setActiveMenu}
        >
        <div>Partners INVENIO Page</div>
        </Layout>
    )
}

export default partnersINVENIO;