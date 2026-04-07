import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function MainForm() {

    const [portfolioTitle, setPortfolioTitle] = useState("");
    const [mainQuote, setMainQuote] = useState("");
    const [subQuote, setSubQuote] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [hasProfile, setHasProfile] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/profiles/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) return;
                setPortfolioTitle(data.portfolio_title || "");
                setMainQuote(data.main_quote || "");
                setSubQuote(data.sub_quote || "");
                setIntroduction(data.introduction || "");
                setGithubLink(data.github_link || "");
                setHasProfile(true);
            })
            .catch(() => {

            });
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const method = hasProfile ? "PUT" : "POST";
            const res = await fetch(`${API_BASE}/profiles/`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    portfolio_title: portfolioTitle,
                    main_quote: mainQuote,
                    sub_quote: subQuote,
                    introduction: introduction,
                    github_link: githubLink,
                }),
            });

            const data = await res.json();
            if (data && !data.error) {
                alert(hasProfile ? "Profile updated" : "Profile saved");
            } else {
                alert("Save failed");
            }
        } catch (err) {
            alert(`Save failed : ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-6 font-title" onSubmit={(e) => e.preventDefault()}>

            <div>
                <label className="text-admintitle">Portfolio Title</label>
                <input
                    value={portfolioTitle}
                    onChange={(e) => setPortfolioTitle(e.target.value)}
                    placeholder="Enter portfolio title..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Main Quote</label>
                <input
                    value={mainQuote}
                    onChange={(e) => setMainQuote(e.target.value)}
                    placeholder="Enter main quote..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Sub Quote</label>
                <input
                    value={subQuote}
                    onChange={(e) => setSubQuote(e.target.value)}
                    placeholder="Enter sub quote..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Introduction</label>
                <input
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="Enter introduction..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">GitHub Link</label>
                <input
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="Enter your GitHub link..."
                    className="input-style"
                />
            </div>
            
            <button type="button" onClick={handleSave} className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : "SAVE"}
            </button>
        </form>
    );
}