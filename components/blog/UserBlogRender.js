import React from 'react'
import Link from "next/link";
import { IoShareSocial } from "react-icons/io5";
import CopyLinkButton from '../smallComponent/CopyLinkButton';
import ImageComponent from "@/components/blog/ImageComponent";
function UserBlogRender({ article }) {
     
    function renderTextWithLinks(text) {
        if (!text || typeof text !== 'string') return null;

        // Regex to match [label](url), **bold**, and *italic*
        const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            if (match[1]) {
                // Link match
                parts.push(
                    <Link
                        key={match[3] + match.index}
                        href={match[3]}
                        className="text-blue-500 font-bold mx-1 hover:text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {match[2]}
                    </Link>
                );
            } else if (match[4]) {
                // Bold match (**text**)
                parts.push(<strong key={'b' + match.index}>{match[5]}</strong>);
            } else if (match[6]) {
                // Italic match (*text*)
                parts.push(<em key={'i' + match.index}>{match[7]}</em>);
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    }
    return (
        <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
            <div className='flex items-center justify-between '>
                <span className="text-sm text-gray-500 mb-2 block">
                    {new Date(article.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })}
                </span>

                <CopyLinkButton url={`https://aktubrand.vercel.app/blog/${article.slug}`} />

            </div>

            <hr />

            {article.content.map((block, index) => {
                switch (block.type) {
                    case 'heading': {
                        const HeadingTag = `h${block.level || 1}`;
                        return (
                            <HeadingTag
                                key={index}
                                className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 mb-2"
                            >
                                {renderTextWithLinks(block.value)}
                            </HeadingTag>
                        );
                    }

                    case 'paragraph':
                        return (
                            <p
                                key={index}
                                className="text-base md:text-lg lg:text-xl leading-relaxed mb-4"
                            >
                                {renderTextWithLinks(block.value)}
                            </p>
                        );

                    case 'code':
                        return (
                            <pre
                                key={index}
                                className="bg-gray-100 p-4 rounded text-sm md:text-base font-mono overflow-x-auto mb-4"
                            >
                                <code>{block.value}</code>
                            </pre>
                        );

                    case 'image':
                        return (
                            <div
                                key={index}
                                className="flex items-center flex-col py-4 h-[40vh] md:h-[60vh] "
                            >
                                <ImageComponent imageUrl={block.value} alt={block.alt} />
                                <span className="italic text-sm mt-2">{block.alt}</span>
                            </div>
                        );

                    case 'list':
                        return (
                            <ul
                                key={index}
                                className="list-disc list-inside text-base md:text-lg lg:text-xl mb-4 space-y-1"
                            >
                                {block.value.split('\n').map((item, i) => (
                                    <li key={i}>{renderTextWithLinks(item)}</li>
                                ))}
                            </ul>
                        );
                    case 'blockquote':
                        return (
                          <blockquote
    key={index}
    className="relative bg-gray-50 text-gray-800 text-lg md:text-xl leading-relaxed italic px-6 py-4 my-6 rounded-md border-l-2 border-gray-300"
>
    {block.value?.split('\n').map((line, i) => (
        <p key={i} className="mb-2 before:content-['“'] after:content-['”']">
            {line}
        </p>
    ))}
</blockquote>

                        );

                    case 'table': {
                        let rows = [];

                        // Ensure value is a string and parse safely
                        if (typeof block.value === 'string') {
                            rows = block.value
                                .split('\n') // Split by row
                                .map(row => row.split(',')); // Split each row into columns
                        }

                        return (
                            <div key={index} className="my-4 overflow-auto border rounded shadow-md">
                                <table className="min-w-full text-sm text-left border-collapse">
                                    <tbody>
                                        {rows.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={
                                                    rowIndex === 0
                                                        ? 'bg-red-200 text-black text-center font-semibold'
                                                        : rowIndex % 2 === 0
                                                            ? 'bg-gray-100'
                                                            : 'bg-white'
                                                }
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="border px-4 py-3">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }

                    default:
                        return null;
                }

            })}


        </>
    )
}

export default UserBlogRender
