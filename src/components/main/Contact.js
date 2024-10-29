const Contact = () => {
    return (
        <section className="bg-gray-800 text-white py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
          <form className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg space-y-6 shadow-md">
            <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <textarea placeholder="Your Message" className="w-full p-3 rounded bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4"></textarea>
            <button type="submit" className="w-full bg-indigo-600 py-3 rounded text-white font-semibold hover:bg-indigo-700 transition-all">
              Send Message
            </button>
          </form>
        </section>
      );
    
}

export default Contact;