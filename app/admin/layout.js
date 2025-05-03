 
import Asidebar from "@/components/admin/Asidebar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         
      >
        <div className="min-h-[200vh] flex gap-4 px-3">
      <Asidebar />
      <div className="flex-1 ">
      {children}
        
        
      </div>
    </div>
       
         
      </body>
    </html>
  );
}
