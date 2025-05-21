import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Contact() {
    
  return (
    <>
    <Navbar/>
<div class="container-fluid bg-secondary p-5 text-light">
    <h1 class="text-center">Contact Us</h1>
    <p style={{textAlign:"justify",Margin:"0px,100px,0px,100px"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quasi iure eveniet
        omnis ipsum perferendis blanditiis sapiente, cum, temporibus necessitatibus sequi ut? Amet, deserunt minima
        incidunt perspiciatis tenetur debitis nobis?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id optio
        error hic reprehenderit provident, consequuntur, asperiores a omnis cumque odio eveniet nihil praesentium
        officiis saepe modi illo nesciunt accusamus iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Harum quia eveniet voluptates recusandae voluptate. Officiis impedit rerum doloremque, totam pariatur quidem
        expedita tempore corporis. Soluta voluptates porro nam maxime neque!
    </p>

</div>
<div class="container row p-5">
    <div class="col">
        <h3 class="text-center">Get In Touch</h3>
        <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quasi iure eveniet
            omnis ipsum perferendis blanditiis sapiente, cum, temporibus necessitatibus sequi ut? Amet, deserunt minima
            incidunt perspiciatis tenetur debitis nobis?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id optio
            error hic reprehenderit provident, consequuntur, asperiores a omnis cumque odio eveniet nihil praesentium
            officiis saepe modi illo nesciunt accusamus iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Harum quia eveniet voluptates recusandae voluptate. Officiis impedit rerum doloremque, totam pariatur quidem
            expedita tempore corporis. Soluta voluptates porro nam maxime neque!
        </p>
        <div class="border-bottom">
            <p>
                <i class="fa-solid fa-location-pin p-3 bg-dark rounded-circle text-light"></i>
                Address: ABC Tower,Calicut
            </p>
            <p>
                <i class="fa-solid fa-location-pin p-3 bg-dark rounded-circle text-light"></i>
                Phone:98xxxxxxxx
            </p>
            <p>
                <i class="fa-solid fa-envelope p-3 bg-dark rounded-circle text-light"></i>
                Email:xyz&#64;gmail.com
            </p>
        </div>
        <div class="d-flex justify-content-around p-5 my-5">
            <i class="fa-brands fa-instagram p-2 bg-info rounded-circle text-light"></i>
            <i class="fa-brands fa-facebook p-2 bg-info rounded-circle text-light"></i>
            <i class="fa-brands fa-x-twitter p-2 bg-info rounded-circle text-light"></i>
            <i class="fa-brands fa-youtube p-2 bg-info rounded-circle text-light"></i>
        </div>

    </div>
    <div class="col d-flex justify-content-center">
        <div class="shadow border m-5 p-5 w-75">
        <h2 class="my-5">Add your testimony</h2>
        <div>
             <form action="/submit" method="POST">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" required></input>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" required></input>
                            </div>
                            <div class="mb-3">
                                <label for="testimony" class="form-label">Testimony</label>
                                <textarea class="form-control" id="testimony" name="testimony" rows="5" placeholder="Share your testimony" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-secondary w-100">Submit</button>
                        </form>
            
        </div>


        </div>
    </div>
</div>
<Footer/>
</>
  )
}

export default Contact