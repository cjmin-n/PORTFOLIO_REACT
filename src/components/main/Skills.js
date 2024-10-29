const skills = [
  { name: 'JavaScript', icon: '🟨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'MongoDB', icon: '🍃' },
  // 필요한 만큼 추가
];

const Skills = () => {
    return (
        <section className="bg-gray-800 text-white py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-700 rounded-lg shadow-md w-32">
                <span className="text-5xl">{skill.icon}</span>
                <p className="mt-4 text-lg font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>
      );
};

export default Skills;