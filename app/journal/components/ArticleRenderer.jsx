import Image from 'next/image';

export default function ArticleRenderer({ content }) {
  // Cek apakah content valid
  if (!content || !content.blocks) return null;

  return (
    <div className="prose prose-lg prose-stone max-w-none">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          
          // --- HEADER ---
          case 'header':
            // Level header (h1 - h6)
            const Tag = `h${block.data.level}`;
            return (
              <Tag key={index} className="font-bold text-text-main mt-8 mb-4">
                {block.data.text}
              </Tag>
            );
          
          // --- PARAGRAPH ---
          case 'paragraph':
            return (
              <p 
                key={index} 
                className="text-text-soft leading-relaxed mb-4" 
                dangerouslySetInnerHTML={{ __html: block.data.text }} 
              />
            );
          
          // --- LIST (PERBAIKAN UTAMA DI SINI) ---
          case 'list':
            const isOrdered = block.data.style === 'ordered';
            const ListTag = isOrdered ? 'ol' : 'ul';
            const listClass = isOrdered ? 'list-decimal' : 'list-disc';
            
            return (
              <ListTag key={index} className={`${listClass} pl-6 mb-4 text-text-soft`}>
                {block.data.items.map((item, i) => {
                  // Cek tipe data: Jika string langsung pakai, jika object ambil properti .content
                  const itemContent = typeof item === 'string' ? item : item.content || '';
                  
                  return (
                    <li 
                      key={i} 
                      className="mb-2 pl-1" 
                      dangerouslySetInnerHTML={{ __html: itemContent }} 
                    />
                  );
                })}
              </ListTag>
            );

          // --- IMAGE ---
          case 'image':
            return (
              <figure key={index} className="my-8">
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                    <Image 
                        src={block.data.file.url} 
                        alt={block.data.caption || 'Article Image'} 
                        fill 
                        className="object-cover"
                    />
                </div>
                {block.data.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          // --- QUOTE ---
          case 'quote':
             return (
                 <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-6 italic text-lg text-gray-700 bg-gray-50 rounded-r-lg">
                     "{block.data.text}"
                     {block.data.caption && <cite className="block text-sm text-gray-500 mt-2 not-italic">- {block.data.caption}</cite>}
                 </blockquote>
             );

          // --- DELIMITER (Garis Pembatas) ---
          case 'delimiter':
             return <hr key={index} className="my-8 border-gray-200" />;

          default:
            console.warn('Unknown block type:', block.type);
            return null;
        }
      })}
    </div>
  );
}