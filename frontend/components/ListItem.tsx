interface ListItemProps {
    title: string;
    onEdit: () => void;
    onRemove: () => void;
    showEdit?: boolean;
}

export default function ListItem({ title, onEdit, onRemove, showEdit = false }: ListItemProps) {
    return (
        <div className="flex flex-col text-black mt-4">
            <div className="flex justify-between items-center py-3 px-5 bg-white/40 border rounded-xl">
                <span className="text-admintitle font-title font-bold">
                    {title}
                </span>

                <div className="flex items-center gap-2">
                    {showEdit && (
                        <button onClick={onEdit}>Edit</button>
                    )}

                    <button onClick={onRemove}>Remove</button>
                </div>
            </div>
        </div>
    );
}