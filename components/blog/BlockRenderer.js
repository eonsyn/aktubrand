'use client';

export default function BlockRenderer({ block, index, setEditIndex }) {
  switch (block.type) {
    case 'heading': {
        const HeadingTag = `h${block.level || 1}`;
        return (
            <HeadingTag
                className={`my-2 font-bold cursor-pointer text-${block.level === 1 ? '4xl' : block.level === 2 ? '3xl' : '2xl'}`}
                onClick={() => setEditIndex(index)}
            >
                {block.value || `Heading (H${block.level || 1})`}
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
                {block.value || 'Write a paragraph...'}
            </p>
        );
}
}
