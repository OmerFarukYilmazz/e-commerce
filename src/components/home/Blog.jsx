import BlogPost from './BlogPost';
import PostImg from "../../assets/PostImg.jpg";

const Blog = () => {
  return (
    <section className="w-[90%] m-auto py-16">
      <div className="text-center mb-12">
        <span className="text-blue-500 block mb-2">Practice Advice</span>
        <h2 className="text-4xl font-bold text-gray-900">Featured Posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BlogPost 
          image="src/assets/PostImg.jpg"
          category="English Department"
          title="Graphic Design"
          description="We focus on ergonomics and meeting you where you work. It's only a keystroke away."
          date="22h"
          rating="4.9"
          sales={15}
          price="16.48"
          salePrice="6.48"
          lessons={64}
          progress="Progress"
          isSale={true} // isNew yerine isSale kullanıyoruz
        />
        <BlogPost 
          image="src/assets/PostImg.jpg"
          category="English Department"
          title="Graphic Design"
          description="We focus on ergonomics and meeting you where you work. It's only a keystroke away."
          date="22h"
          rating="4.9"
          sales={15}
          price="16.48"
          salePrice="6.48"
          lessons={64}
          progress="Progress"
          isSale={true}
        />
      </div>
    </section>
  );
};

export default Blog;