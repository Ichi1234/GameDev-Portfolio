interface ListItemProps {
    title: string;
    onEdit?: () => void;
    onRemove: () => void;
    showEdit?: boolean;
    description?: string | null;
}

export default function ListItem({ title, onEdit, onRemove, showEdit = false, description = null }: ListItemProps) {
    return (
        <div className="flex flex-col text-black mt-4">
            <div className="grid grid-cols-3 justify-between items-center py-3 px-5 bg-white/40 border border-[#e0e0e0] rounded-xl">
                <span className="text-admintitle font-title font-bold">{title}</span>
                <span className="text-admintitle font-title font-bold">{description}</span>

                <div className="flex justify-end items-center gap-2">
                    {showEdit && (
                        <button type="button" onClick={onEdit} className="uppercase font-semibold text-sm cursor-pointer hover:bg-[#dba8781a] border-2 border-[#dba878] text-[#dba878] px-5 py-1 rounded-lg">Edit</button>
                    )}
                    
                    <button type="button" onClick={onRemove} className="uppercase font-semibold text-sm cursor-pointer hover:bg-[#c9184a17] border-2 border-[#c9184a] text-[#c9184a] px-5 py-1 rounded-lg">Remove</button>
                </div>
            </div>
        </div>
    );
}