'use client';
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const emptyBlock = [{ type: 'paragraph', value: '', level: 1, items: [] }];

export default function BlockEditor({
    block, index, isEditing, autoFocusField,
    setEditIndex,
    blocks, setBlocks, setisopitonOpen,
    isopitonOpen, setAutoFocusField, altInputRef
}) {
    const handleChange = (index, value) => {
        const updated = [...blocks];
        updated[index].value = value;
        if (updated[index].type === 'list') {
            updated[index].items = value.split('\n');
        }
        setBlocks(updated);
    };

    const shouldAutoFocus = autoFocusField === index;
    const handleDelete = (index) => {
        // Only delete if more than one block exists
        if (blocks.length > 1) {
            const updatedBlocks = blocks.filter((_, i) => i !== index);
            setBlocks(updatedBlocks);

        }
    };
    const handleTypeChange = (index, newType) => {
        const updated = [...blocks];
        updated[index].type = newType;
        if (newType === 'heading') updated[index].level = 1;
        if (newType === 'list') updated[index].items = updated[index].value.split('\n');
        setBlocks(updated);
        setEditIndex(null); // force re-render
        setTimeout(() => setEditIndex(index), 0);
    };
    const handleEnter = (index, e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, { ...emptyBlock[0] });
            setBlocks(newBlocks);
            setEditIndex(index + 1);
        }
    };

    const handlePaste = (e, index) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');

        // Split into lines and trim
        const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

        const newBlocks = [];
        let listBuffer = [];
        let codeBuffer = [];
        let inCodeBlock = false;

        lines.forEach(line => {
            if (line.startsWith('```')) {
                // Toggle code block
                if (inCodeBlock) {
                    newBlocks.push({
                        type: 'code',
                        value: codeBuffer.join('\n'),
                        items: []
                    });
                    codeBuffer = [];
                    inCodeBlock = false;
                } else {
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                codeBuffer.push(line);
                return;
            }

            if (/^#{1,6}\s/.test(line)) {
                // Markdown heading (e.g. ## Heading)
                const level = line.match(/^#+/)[0].length;
                newBlocks.push({
                    type: 'heading',
                    level,
                    value: line.replace(/^#{1,6}\s/, ''),
                    items: []
                });
            } else if (/^[-*+]\s+/.test(line)) {
                // List item
                listBuffer.push(line.replace(/^[-*+]\s+/, ''));
            } else {
                // If list buffer is filled and a non-list line comes, flush it
                if (listBuffer.length > 0) {
                    newBlocks.push({
                        type: 'list',
                        value: listBuffer.join('\n'),
                        items: [...listBuffer]
                    });
                    listBuffer = [];
                }

                // Otherwise treat it as a paragraph
                newBlocks.push({
                    type: 'paragraph',
                    value: line,
                    items: []
                });
            }
        });

        // Flush any remaining buffers
        if (listBuffer.length > 0) {
            newBlocks.push({
                type: 'list',
                value: listBuffer.join('\n'),
                items: [...listBuffer]
            });
        }

        if (codeBuffer.length > 0) {
            newBlocks.push({
                type: 'code',
                value: codeBuffer.join('\n'),
                items: []
            });
        }

        // Update blocks by replacing current index block with the new ones
        const updated = [...blocks];
        updated.splice(index, 1, ...newBlocks);
        setBlocks(updated);
    };
    const handleAltChange = (index, altText) => {
        const updated = [...blocks];
        updated[index].alt = altText;
        setBlocks(updated);
    };
    return (
        <div className='transition-all ease-in-out h-fit duration-100' >
            <div className="mb-1    items-center h-full flex">
                {/* Plus Button */}
                <div
                    className="h-10 w-10 rounded-full text-center font-bold text-4xl flex items-center justify-center cursor-pointer border border-highlight text-highlight"
                    onClick={() => setisopitonOpen(!isopitonOpen)}
                >
                    <span
                        className={`transition-transform duration-300 ease-in-out ${isopitonOpen ? '  rotate-45' : 'rotate-0'}`}
                    >
                        <IoMdAdd />
                    </span>
                </div>

                {/* Custom Options Menu */}
                {isopitonOpen && (
                    <div className="block ml-1.5 transition-all ease-in-out duration-100   rounded  p-2 space-y-2">
                        {['paragraph', 'heading', 'code', 'list', 'image', 'insert'].map((type, i) => (
                            <span
                                key={type}
                                onClick={() => {
                                    handleTypeChange(index, type);
                                    setAutoFocusField(index);
                                    setisopitonOpen(false);
                                }}
                                className={block.type === type ? ("cursor-pointer bg-highlight duration-100 ease-in-out transition-all shadow  text-white    mx-1 px-2 py-1 rounded capitalize opacity-0 animate-fade-in") : ("cursor-pointer hover:bg-highlight duration-100 ease-in-out transition-all shadow hover:text-white  bg-gray-100 mx-1 px-2 py-1 rounded capitalize opacity-0 animate-fade-in")}
                                style={{
                                    animationDelay: `${i * 0.05}s`,
                                    animationFillMode: 'forwards',
                                }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                )}
                {!isopitonOpen && (
                    <div className='h-full flex  items-center'>
                        <span

                            className="cursor-pointer  bg-highlight duration-100 ease-in-out transition-all  mx-1 px-2 py-1 rounded capitalize text-white opacity-0 animate-fade-in"

                        >
                            {block.type}
                        </span>
                        {block.type === 'heading' && (
                            <div className="flex  gap-2 items-center ">
                                <select
                                    value={block.level || 1}
                                    onChange={(e) => {
                                        const updated = [...blocks];
                                        updated[index].level = parseInt(e.target.value);
                                        setBlocks(updated);
                                    }}
                                    className="border p-1 rounded"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((lvl) => (
                                        <option key={lvl} value={lvl}>
                                            H{lvl}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        )}
                        <span
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer hover:scale-105 transition-all ease-in-out duration-150 ml-10 text-3xl"><MdDelete /></span>
                    </div>
                )}
            </div>

            {['paragraph', 'heading', 'list', 'code', 'insert'].includes(block.type) && (
                <textarea
                    className="w-full p-2 border   my-2"
                    placeholder={`Enter ${block.type} content`}
                    value={block.value}
                    {...(block.type === 'insert' && {
                        onPaste: (e) => handlePaste(e, index),
                    })}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => {
                        if (block.value.trim() !== '') {
                            handleEnter(index, e);
                            setAutoFocusField(index + 1);
                        }
                    }}
                    onFocus={() => setAutoFocusField(index)}
                    autoFocus={shouldAutoFocus}
                />

            )}


            {block.type === 'image' && (
                <>
                    <input
                        type="text"
                        placeholder="Paste image URL"
                        className="border p-2 w-full my-2"
                        value={block.value}
                        onChange={(e) => handleChange(index, e.target.value)}

                        autoFocus={shouldAutoFocus}
                    />

                    <input
                        type="text"
                        ref={altInputRef}
                        placeholder="Image alt text"
                        className="border p-2 w-full my-2"
                        value={block.alt || ''}
                        onKeyDown={(e) => handleEnter(index, e)}
                        onChange={(e) =>
                            handleAltChange(index, e.target.value)
                        }
                    />

                    {block.value && (
                        <>
                            <img
                                src={block.value}
                                alt={block.alt || 'Image'}
                                className="rounded max-w-xs mt-2"
                            />
                            {block.alt && (
                                <span className="text-sm text-gray-500 italic">{block.alt}</span>
                            )}
                        </>
                    )}
                </>
            )}

        </div>
    );
}
