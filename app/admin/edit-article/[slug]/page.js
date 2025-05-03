'use client';
import { useEffect, useRef, useState } from 'react';
import BlockEditor from '@/components/blog/BlockEditor';
import BlockRenderer from '@/components/blog/BlockRenderer';
const emptyBlock = [{ type: 'paragraph', value: '', level: 1, items: [] }];

function Page({ params }) {
    
    const [id, setId] = useState("")
    const [title, setTitle] = useState('');
const[notFound,setNotFound]=useState(false);
const [thumbnailUrl, setthumbnailUrl] = useState('');
const [tags, settags] = useState([]);
    const [blocks, setBlocks] = useState([{ ...emptyBlock }]);
    const [editIndex, setEditIndex] = useState(null);
    const [autoFocusField, setAutoFocusField] = useState(null);
    const [isopitonOpen, setisopitonOpen] = useState(false);
    const isOpenRef = useRef(isopitonOpen);
    const altInputRef = useRef(null);
    useEffect(() => {
        const fetchArticle = async () => {
            const { slug } = await params;
          try {
            const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
            const post = await res.json();
      
            const article = post.article;
      
            if (!article) {
              
              console.error('Article not found');
              setNotFound(true); // Use this to conditionally render later
               alert('Article not found here',NotFound)
                return;
            }
      
            setId(article._id); // Assuming you have setId state
            setTitle(article.title);
            setBlocks(article.content);
            setthumbnailUrl(article.thumbnailUrl);
            settags(article.tags);
          } catch (err) {
            console.error('Error fetching article:', err);
            setNotFound(true);
          }
        };
      
        fetchArticle();
      }, []);
      

    useEffect(() => {
        isOpenRef.current = isopitonOpen;
    }, [isopitonOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                if (isOpenRef.current) {

                    setisopitonOpen(false);
                } else {

                    setisopitonOpen(true);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 
    
      
    const renderBlock = (block, index) => {
        const isEditing = editIndex === index;
        const shouldAutoFocus = autoFocusField === index;

        if (isEditing) {
            return (
                <BlockEditor
                    block={block}
                    index={index}
                    blocks={blocks}
                    setBlocks={setBlocks}
                    isEditing={isEditing}
                    autoFocusField={autoFocusField}
                    setEditIndex={setEditIndex}
                    setisopitonOpen={setisopitonOpen}
                    isopitonOpen={isopitonOpen}
                    setAutoFocusField={setAutoFocusField}
                    altInputRef={altInputRef}

                />
            );
        }


        // Preview mode (non-editing)
        return (
            <BlockRenderer
                block={block}
                index={index}
                setEditIndex={setEditIndex}
            />
        );

    };
 
    const handleSubmit = async () => {
        if (!title.trim() || blocks.length === 0) {
            alert('Title and content cannot be empty!');
            return;
        }
        const cleanedBlocks = blocks.filter(block => {
            if (!block.value || block.value.trim() === '') return false;
            if (block.type === 'list' && (!block.items || block.items.length === 0)) return false;
            return true;
        });

        if (cleanedBlocks.length === 0) {
            alert('All content blocks are empty or invalid!');
            return;
        }

        const payload = {
            title,
            slug: title.toLowerCase().replace(/ /g, '-'),
            author: 'Admin',
            tags: tags,
            thumbnailUrl: thumbnailUrl,
            content: cleanedBlocks,
            _id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublished: false,
        };

        try {
            const res = await fetch('/api/blog/save-article', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (result.success) {
                alert('Article updated successfully!');
            } else {
                alert('Failed to save article.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting article.');
        }
    };


    return (
        <div className="max-w-3xl min-h-screen mx-auto px-4 py-6">
          {notFound ? (
            <div className="h-screen flex items-center justify-center text-center">
              <h1 className="text-2xl font-bold">No such article found</h1>
            </div>
          ) : (
            <>
              <input
                className="text-4xl font-bold w-full mb-6 outline-none"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
      
              {blocks.map((block, index) => (
                <div key={index}>{renderBlock(block, index)}</div>
              ))}
      
              <button
                onClick={handleSubmit}
                className="mt-6 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update the Post
              </button>
            </>
          )}
        </div>
      );
      
}

export default Page;
