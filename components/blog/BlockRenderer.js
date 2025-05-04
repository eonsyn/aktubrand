'use client';
import Link from "next/link";
export default function BlockRenderer({ block, index, setEditIndex ,loading }) {

     

    function renderTextWithLinks(text) {
        if (!text || typeof text !== 'string') return null;
    
        const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
    
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            parts.push(
                <Link
                    key={match[2] + match.index}
                    href={match[2]}
                    title={"link"}
                    className="text-blue-500 font-bold mx-1 hover:text-blue-600 font-sans tracking-tighter underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {match[1]}
                </Link>
            );
            lastIndex = regex.lastIndex;
        }
    
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
    
        return parts;
    }
    
    

  switch (block.type) {
    case 'heading': {
        const HeadingTag = `h${block.level || 1}`;
        const levelClasses = {
            1: 'text-4xl',
            2: 'text-3xl',
            3: 'text-2xl',
        };
        const headingClass = levelClasses[block.level] || 'text-xl';
    
        return (
            <HeadingTag
                className={`my-2 font-bold cursor-pointer ${headingClass}`}
                onClick={() => setEditIndex(index)}
            >
                {renderTextWithLinks(block.value) || `Heading (H${block.level || 1})`}
            </HeadingTag>
        );
    }
    
    case 'code':
        return (
            <pre
                className="bg-gray-100 p-2 rounded my-2 font-mono cursor-pointer whitespace-pre-wrap"
                onClick={() => setEditIndex(index)}
            >
                <code>{block.value || '// code here'}</code>
            </pre>
        );
    case 'image':
        return (
            <div className="my-4 cursor-pointer" onClick={() => setEditIndex(index)}>
                {block.value ? (
                    <><img
                        src={block.value}
                        alt={block.alt || "image"}
                        className="rounded max-w-full mx-auto"
                    />
                        {block.alt && (
                            <span className="text-sm text-gray-500 italic">{block.alt}</span>
                        )}
                    </>

                ) : (
                    <p className="text-red-500">No image URL provided</p>
                )}
            </div>
        );
    case 'list':
        return (
            <ul
                className="list-disc list-inside my-2 cursor-pointer"
                onClick={() => setEditIndex(index)}
            >
                {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        );
    default:
        return (
            <p
                className="text-lg my-2 cursor-pointer"
                onClick={() => setEditIndex(index)}
            >
                {renderTextWithLinks(block.value) || 'Write a paragraph...'}
            </p>
        );
}
}
