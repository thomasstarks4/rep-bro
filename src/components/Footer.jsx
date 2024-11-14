function Footer(props)
{

    return (
       props.showFooter && (
        <div id="foot" className="footer">
        <h2>Questions? Comments? Concerns? <br/>
        Email tom at <a className="white" href="mailto:tom@myrepbro.com">tom@myrepbro.com</a></h2>
        <button onClick={function() {
            props.toggleFooter();
            setTimeout(() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth', // Makes the scrolling smooth
                });
              }, 0); // Timeout ensures state update happens before scroll
        }}>Hide Footer</button>
        </div>
       ) 
    )
}

export default Footer;