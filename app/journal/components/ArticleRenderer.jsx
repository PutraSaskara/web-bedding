import Image from 'next/image';

export default function ArticleRenderer({ content }) {
  // Cek apakah content valid
  if (!content || !content.blocks) return null;

  return (
    <div className="prose prose-sm sm:prose-lg prose-stone max-w-none">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          
          // --- HEADER ---
          case 'header':
            // Level header (h1 - h6)
            const Tag = `h${block.data.level}`;
            return (
              <Tag key={index} className="font-bold text-text-main mt-6 sm:mt-8 mb-3 sm:mb-4">
                {block.data.text}
              </Tag>
            );
          
          // --- PARAGRAPH ---
          case 'paragraph':
            return (
              <p 
                key={index} 
                className="text-text-soft leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base" 
                dangerouslySetInnerHTML={{ __html: block.data.text }} 
              />
            );
          
          // --- LIST (PERBAIKAN UTAMA DI SINI) ---
          case 'list':
            const isOrdered = block.data.style === 'ordered';
            const ListTag = isOrdered ? 'ol' : 'ul';
            const listClass = isOrdered ? 'list-decimal' : 'list-disc';
            
            return (
              <ListTag key={index} className={`${listClass} pl-5 sm:pl-6 mb-3 sm:mb-4 text-text-soft text-sm sm:text-base`}>
                {block.data.items.map((item, i) => {
                  // Cek tipe data: Jika string langsung pakai, jika object ambil properti .content
                  const itemContent = typeof item === 'string' ? item : item.content || '';
                  
                  return (
                    <li 
                      key={i} 
                      className="mb-1.5 sm:mb-2 pl-1" 
                      dangerouslySetInnerHTML={{ __html: itemContent }} 
                    />
                  );
                })}
              </ListTag>
            );

          // --- IMAGE ---
          case 'image':
            return (
              <figure key={index} className="my-6 sm:my-8">
                <div className="relative w-full h-[250px] sm:h-[400px] rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                    <Image 
                        src={block.data.file.url} 
                        alt={block.data.caption || 'Article Image'} 
                        fill 
                        className="object-cover"
                    />
                </div>
                {block.data.caption && (
                  <figcaption className="text-center text-xs sm:text-sm text-gray-500 mt-2 italic">
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          // --- QUOTE ---
          case 'quote':
             return (
                 <blockquote key={index} className="border-l-4 border-primary pl-3 sm:pl-4 py-2 my-4 sm:my-6 italic text-base sm:text-lg text-gray-700 bg-gray-50 rounded-r-lg">
                     &ldquo;{block.data.text}&rdquo;
                     {block.data.caption && <cite className="block text-xs sm:text-sm text-gray-500 mt-2 not-italic">- {block.data.caption}</cite>}
                 </blockquote>
             );

          // --- DELIMITER (Garis Pembatas) ---
          case 'delimiter':
             return <hr key={index} className="my-6 sm:my-8 border-gray-200" />;

          default:
            console.warn('Unknown block type:', block.type);
            return null;
        }
      })}
    </div>
  );
}