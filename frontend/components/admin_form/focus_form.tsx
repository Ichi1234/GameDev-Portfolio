export default function FocusForm() {
    return (
        <form className="flex flex-col gap-6 font-title">
            <div>
                <label className="text-admintitle">Name</label>
                <input
                    placeholder="Enter skill name..."
                    className="input-style"
                />
            </div>

            <button className="btn-primary">
                ADD
            </button>
        </form>
    );
}