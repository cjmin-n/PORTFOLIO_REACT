import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { observeFadeIn } from "../../utils/fadeInOnScroll";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [focusState, setFocusState] = useState({
        name: false,
        email: false,
        message: false
    });

    useEffect(() => {
        observeFadeIn();
    }, []);

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        emailjs.send(
            "service_mdk2g7r", // 서비스 ID
            "template_p3xu0zr", // 템플릿 ID
            {
                name: formData.name,
                email: formData.email,
                message: formData.message
            },
            "yX4Md7J5gfaZLbufz" // EmailJS에서 제공하는 Public Key
        ).then(
            (response) => {
                console.log("✅ SUCCESS!", response.status, response.text);
                alert("이메일이 성공적으로 전송되었습니다!");
                setFormData({ name: "", email: "", message: "" });
            },
            (error) => {
                console.log("❌ FAILED...", error);
                alert("이메일 전송에 실패했습니다.");
            }
        );
    };

    return(
        <section className="section section-contact" id="contact">
            <div className="inner">
                <h4 className="en sub-tit fade-in">Get In Touch</h4>
                <div className="message-wrap fade-in">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-10">
                        {/* Name */}
                        <div className={`input-wrap ${(focusState.name || formData.name) ? "active" : ""}`}>
                            <input 
                                type="text" 
                                id="name"
                                maxLength={10} 
                                value={formData.name}
                                required={true}
                                onChange={handleChange}
                                onFocus={() => setFocusState({ ...focusState, name: true })} 
                                onBlur={() => setFocusState({ ...focusState, name: false })}
                            />
                            <label htmlFor="name">Your Name</label>
                        </div>

                        {/* Email */}
                        <div className={`input-wrap ${(focusState.email || formData.email) ? "active" : ""}`}>
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.email}
                                required={true}
                                onChange={handleChange}
                                onFocus={() => setFocusState({ ...focusState, email: true })} 
                                onBlur={() => setFocusState({ ...focusState, email: false })}
                            />
                            <label htmlFor="email">Your E-mail</label>
                        </div>
                        </div>
                         {/* Message */}
                        <div className={`textarea-wrap ${(focusState.message || formData.message) ? "active" : ""}`}>
                            <textarea 
                                name="message" 
                                id="message" 
                                maxLength={1000}
                                placeholder="의견이나 질문을 자유롭게 입력해주세요! (최대 1000자)"
                                value={formData.message}
                                required={true}
                                onChange={handleChange}
                                onFocus={() => setFocusState({ ...focusState, message: true })} 
                                onBlur={() => setFocusState({ ...focusState, message: false })
                            }
                            ></textarea>
                            <label htmlFor="message">Message</label>
                        </div>
                        <button className="btn"><span>Send Message</span></button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;