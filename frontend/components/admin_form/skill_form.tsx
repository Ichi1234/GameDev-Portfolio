export default function SkillForm() {
    return (
        <form className="flex flex-col gap-6 font-title">
             <div>
                <label className="text-admintitle">Name</label>
                <input
                    placeholder="Enter skill name..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Description</label>
                <input
                    placeholder="Enter skill description..."
                    className="input-style"
                />                
            </div>

            <button className="btn-primary">
                ADD
            </button>
        </form>
    );
}