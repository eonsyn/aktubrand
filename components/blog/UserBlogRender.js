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
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
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
                    case 'heading':
                        const HeadingTag = `h${block.level || 1}`;
                        return <HeadingTag key={index} className="text-2xl font-semibold mt-3 mb-1">{renderTextWithLinks(block.value)}</HeadingTag>;
                    case 'paragraph':
                        return <p key={index} className="text-xl leading-relaxed mb-4">{renderTextWithLinks(block.value)}</p>;
                    case 'code':
                        return (
                            <pre key={index} className="bg-gray-100 p-4 rounded text-sm font-mono overflow-x-auto mb-4">
                                <code>{block.value}</code>
                            </pre>
                        );
                    case 'image':
                        return (
                            <div key={index} className="flex items-center flex-col py-3 h-[40vh]">

                                <ImageComponent imageUrl={block.value} alt={block.alt} />
                                <span className="italic">{block.alt}</span>
                            </div>
                        );
                    case 'list':
                        return (
                            <ul key={index} className="list-disc list-inside text-xl mb-4">
                                {block.value.split('\n').map((item, i) => (
                                    <li key={i}>{renderTextWithLinks(item)}</li>
                                ))}
                            </ul>
                        );
                    default:
                        return null;
                }
            })}
        </>
    )
}

export default UserBlogRender
