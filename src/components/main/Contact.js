import Marquee from '../Marquee';

const Contact = () => {
    return (
        <section id="contact">
            <Marquee/>
            <div className="contact-box">
                <h3 className='title'>Contact</h3>
                <form action="">
                    <div className="input-wrap">
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" id="name" required/>
                    </div>
                    <div className="input-wrap">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" required/>
                    </div>
                    <div className="textarea-wrap">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" required></textarea>
                    </div>
                    <button type='submit' className='btn'>SEND</button>
                </form>
            </div>
        </section>
    );
    
}

export default Contact;