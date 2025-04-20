
const FooterComponent=()=>{
    return(
        <>


<footer className="bg-gray-800 text-white py-2 mt-14 relative flex">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <div className="uppercase font-bold text-3xl">NIVARAN</div>
        <p className="text-gray-400 text-xl">
          Nivaran is a user-friendly website designed to empower users to voice out their problems efficiently. It ensures transparency and accountability between the citizen and government. Users can upload supporting documents, receive notifications on progress, and communicate directly with responsible officials.
        </p>
        <br/>
        
      </div>
      <br/>
      <br/>
      <div className="w-full md:w-1/3 px-6 mb-6 md:mb-0">
        <h5 className="uppercase font-bold mb-2 px-4 text-xl">Quick Links</h5>
        <ul className="list-none space-y-2">
          <li><a href="/about" className="text-gray-400 hover:text-gray-200 text-xl">About</a></li>
          <li><a href="/categories" className="text-gray-400 hover:text-gray-200 text-xl">Categories</a></li>
          <li><a href="/reviews" className="text-gray-400 hover:text-gray-200 text-xl">Reviews</a></li>
          <li><a href="/contact" className="text-gray-400 hover:text-gray-200 text-xl">Contact</a></li>
        </ul>
      </div>
      
      <div className="w-full md:w-1/3">
        <h5 className="uppercase font-bold mb-2">Follow Us</h5>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-200"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#" className="text-gray-400 hover:text-gray-200"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="https://www.instagram.com/nehashah5642" className="text-gray-400 hover:text-gray-200"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="#" className="text-gray-400 hover:text-gray-200"><i className="fab fa-linkedin fa-lg"></i></a>
        </div>



        
      </div>

      <p className="text-gray-400 px-0  justify-center">&copy; 2024 Nivaran. All rights reserved.</p>
    </div>
   
  </div>
</footer>



</>
    )
}
export default FooterComponent