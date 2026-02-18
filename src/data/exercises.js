const exercises = [
    // BEGINNER - Guided Reading
    {
        title: "The Power of Clear Communication",
        content: "Clear communication is the cornerstone of professional success. When you articulate your ideas with precision, people listen more attentively and respond more positively. Every great leader throughout history has understood that the ability to express thoughts clearly is not just a nice-to-have skill — it is essential. Whether you are presenting to a boardroom, pitching to investors, or simply explaining your work to a colleague, clarity in speech begins with clarity in thought. Take a moment before you speak. Organize your main points. Then deliver them with confidence and purpose.",
        type: "guided-reading",
        difficulty: "beginner",
        wordCount: 99,
        category: "general"
    },
    {
        title: "Why First Impressions Matter",
        content: "Research consistently shows that first impressions are formed within the first seven seconds of meeting someone. In professional settings, how you speak carries as much weight as what you say. A confident, well-paced introduction can set the tone for an entire relationship. Avoid rushing through your words or filling pauses with unnecessary sounds. Instead, embrace brief silences as moments of strength. A measured pace communicates authority and thoughtfulness. Remember, your voice is one of the most powerful tools you have — learn to wield it deliberately.",
        type: "guided-reading",
        difficulty: "beginner",
        wordCount: 95,
        category: "business"
    },
    {
        title: "The Art of Listening",
        content: "Effective communication is not just about speaking well — it begins with listening. Active listening means giving your full attention to the speaker, understanding their message, and responding thoughtfully. When you truly listen, you absorb context that makes your own responses more relevant and impactful. In meetings, resist the urge to formulate your reply while someone else is speaking. Instead, focus entirely on their words. You will find that your contributions become sharper, more insightful, and better received by your audience.",
        type: "guided-reading",
        difficulty: "beginner",
        wordCount: 89,
        category: "general"
    },
    {
        title: "Building Confidence Through Practice",
        content: "Confidence in speaking does not come from talent alone — it comes from deliberate practice. The most articulate speakers you admire did not start that way. They practiced relentlessly, refining their delivery through repetition and self-awareness. Start small. Read a paragraph aloud each day. Record yourself and listen back. Notice patterns in your speech: where you hesitate, where you rush, where you lose clarity. Each practice session brings you one step closer to the natural, confident delivery you want to achieve in high-stakes situations.",
        type: "guided-reading",
        difficulty: "beginner",
        wordCount: 93,
        category: "general"
    },
    {
        title: "Simplifying Complex Ideas",
        content: "The ability to explain complex ideas in simple terms is a hallmark of true expertise. When you understand something deeply, you can strip away the jargon and technical language, revealing the core concept beneath. Think of the best teachers you have had — they made difficult subjects feel approachable. In professional settings, this skill is invaluable. Whether you are explaining a technical architecture, a financial model, or a strategic plan, your audience will remember simplicity far longer than complexity.",
        type: "guided-reading",
        difficulty: "beginner",
        wordCount: 86,
        category: "technology"
    },

    // INTERMEDIATE - Guided Reading
    {
        title: "Navigating Difficult Conversations",
        content: "Difficult conversations are inevitable in professional life, yet most people avoid them until the situation becomes untenable. The key to navigating these moments lies in preparation and emotional regulation. Before entering a challenging discussion, clarify your objective. What outcome do you want? What are the essential points you must communicate? Structure your thoughts around the situation, the behavior you observed, and the impact it created. This framework — situation, behavior, impact — provides a neutral, fact-based foundation that reduces defensiveness. Speak calmly and deliberately. Avoid accusatory language. Replace phrases like 'you always' with specific observations. Pause after making a key point to allow it to land. Remember that the goal is not to win an argument but to reach a mutual understanding that moves both parties forward.",
        type: "guided-reading",
        difficulty: "intermediate",
        wordCount: 133,
        category: "business"
    },
    {
        title: "The Science of Persuasion",
        content: "Persuasion is not manipulation — it is the art of presenting your ideas in a way that resonates with your audience's values and priorities. Aristotle identified three pillars of persuasion: ethos, or credibility; pathos, or emotional connection; and logos, or logical reasoning. In modern professional contexts, these principles remain remarkably relevant. Begin by establishing your credibility through relevant experience or data. Then connect emotionally by demonstrating that you understand your audience's challenges. Finally, present a logical argument supported by evidence. The most persuasive speakers weave these three elements together seamlessly. They do not simply state facts — they tell a story that makes the audience feel the importance of those facts. Practice constructing arguments that address all three dimensions, and your ability to influence outcomes will improve dramatically.",
        type: "guided-reading",
        difficulty: "intermediate",
        wordCount: 139,
        category: "philosophy"
    },
    {
        title: "Thinking in Frameworks",
        content: "The most effective communicators do not simply list their ideas — they organize them into frameworks that are easy to follow and remember. When you present information in a structured way, your audience can process it more efficiently and retain it longer. Consider the pyramid principle: start with your main conclusion, then support it with key arguments, and finally provide evidence for each argument. This top-down approach respects your audience's time and ensures that even if they disengage early, they have captured the most important point. Another powerful framework is the rule of three. Group your ideas into three main categories, and you will find that your communication feels more natural and memorable. Whether you are writing an email, delivering a presentation, or answering a question in a meeting, frameworks give your words structure and impact.",
        type: "guided-reading",
        difficulty: "intermediate",
        wordCount: 147,
        category: "business"
    },
    {
        title: "Technical Communication Excellence",
        content: "In the technology industry, the gap between brilliant thinking and brilliant communication can determine the trajectory of entire projects. Engineers and technical professionals often possess deep expertise but struggle to convey their insights to diverse audiences. The solution begins with audience awareness. Before you speak, ask yourself: What does my audience already know? What do they need to know? What is the simplest path from one to the other? Use analogies drawn from everyday experience to bridge technical concepts. Compare a load balancer to a traffic controller, explain caching as a shortcut your computer memorizes, or describe an API as a restaurant menu that tells you what you can order without revealing the kitchen's secrets. These translations make your expertise accessible without diluting its substance. The best technical communicators are bridges between complexity and understanding.",
        type: "guided-reading",
        difficulty: "intermediate",
        wordCount: 148,
        category: "technology"
    },

    // ADVANCED - Guided Reading
    {
        title: "Leadership Through Narrative",
        content: "The most transformative leaders in business and technology share a common trait: they are masterful storytellers. Not in the fictional sense, but in their ability to weave vision, strategy, and action into a compelling narrative that inspires collective effort. Consider how the most effective product launches, company pivots, or organizational changes are communicated — they follow a narrative arc. There is a clear articulation of the current reality, including its challenges and limitations. Then comes the vision of a better future, painted with enough specificity to feel achievable yet enough ambition to feel exciting. Finally, there is a concrete path forward that gives every listener a role in the journey. This narrative structure works because human brains are wired for stories. We remember narratives far better than bullet points. We emotionally invest in characters and outcomes. When you frame your professional communication as a story — with stakes, progression, and resolution — you engage people at a fundamentally deeper level. Practice telling the story of your work, your team, and your vision. Make it vivid. Make it human. Make it impossible to ignore.",
        type: "guided-reading",
        difficulty: "advanced",
        wordCount: 184,
        category: "business"
    },
    {
        title: "The Architecture of Argument",
        content: "Constructing a persuasive argument under pressure requires both intellectual rigor and emotional intelligence. The best debaters and negotiators do not simply react — they operate from a framework that allows them to think systematically while appearing spontaneous. Begin with a clear thesis statement. This is your anchor. Every subsequent point should orbit this central idea, providing evidence, addressing counterarguments, or reinforcing the core message. When addressing objections, employ the acknowledge-bridge-counter technique: first validate the opposing perspective to demonstrate that you have considered it seriously, then bridge to your position with a transitional phrase, and finally present your counter-evidence. This approach disarms opposition while strengthening your credibility. Pay attention to your vocal variety. Monotone delivery undermines even the strongest arguments. Vary your pace to emphasize key points — slow down for critical assertions, and speed up slightly when covering familiar ground. Use strategic pauses to create anticipation and allow complex ideas to resonate. The architecture of a great argument is invisible to the audience. They simply experience a clear, compelling, and seemingly effortless flow of ideas. But behind that flow is deliberate structure, practiced phrasing, and conscious delivery choices.",
        type: "guided-reading",
        difficulty: "advanced",
        wordCount: 193,
        category: "philosophy"
    },

    // IMPROMPTU SPEAKING PROMPTS
    {
        title: "Explain a Technical Concept",
        content: "Explain how a search engine works to someone who has never used the internet. You have 90 seconds. Focus on making the concept accessible without oversimplifying.",
        type: "impromptu-speaking",
        difficulty: "beginner",
        wordCount: 30,
        category: "technology"
    },
    {
        title: "Pitch Your Current Project",
        content: "You are in an elevator with a potential investor. Pitch your current project or idea in 60 seconds. Cover the problem, your solution, and why it matters.",
        type: "impromptu-speaking",
        difficulty: "intermediate",
        wordCount: 30,
        category: "business"
    },
    {
        title: "Defend a Controversial Opinion",
        content: "Take a position on whether remote work is better than in-office work. Present three structured arguments supporting your position, acknowledge one counterargument, and conclude with a strong summary statement.",
        type: "impromptu-speaking",
        difficulty: "advanced",
        wordCount: 34,
        category: "business"
    },
    {
        title: "Explain Your Decision-Making Process",
        content: "Describe a recent difficult decision you made at work. Walk through your thought process: what options did you consider, what tradeoffs did you evaluate, and what ultimately led to your choice?",
        type: "impromptu-speaking",
        difficulty: "intermediate",
        wordCount: 35,
        category: "general"
    },
    {
        title: "The Future of AI",
        content: "Share your perspective on how artificial intelligence will change your industry in the next five years. Be specific about opportunities and risks, and explain what professionals should do to prepare.",
        type: "impromptu-speaking",
        difficulty: "advanced",
        wordCount: 34,
        category: "technology"
    }
];

module.exports = exercises;
