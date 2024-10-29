const Visual = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white px-4">
            <img src="/profile.jpg" alt="Profile" className="rounded-full w-40 h-40 mb-6 shadow-lg border-4 border-indigo-500" />
            <h1 className="text-5xl font-bold mb-4">Your Name</h1>
            <p className="text-xl mb-8">Full-Stack Developer</p>
            <p className="text-center max-w-md leading-relaxed mb-6">
            Crafting solutions for real-world problems with code.
            </p>
            <div className="btn-wrap flex">
                <a href="#projects" className="mt-8 bg-indigo-600 py-3 px-8 rounded-full text-white font-semibold shadow-lg hover:bg-indigo-700 transition-colors">
                See My Work
                </a>
                <span className="block"></span>
                <a href="#contact" className="mt-8 bg-slate-900 py-3 px-8 rounded-full text-white font-semibold shadow-lg hover:bg-slate-950 transition-colors">
                Get in touch
                </a>
            </div>
        </section>
    );
}

export default Visual;