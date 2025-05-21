import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <>
    <Navbar/>
<div class="container-fluid">
    <div class="row">
        <div class="col  d-flex justify-content-center">
            <img src="https://media.istockphoto.com/id/641448082/photo/beautiful-tropical-beach-front-hotel-resort-with-swimming-pool-sunshine.jpg?s=612x612&w=0&k=20&c=9PyitcP743oS7oGAoSW8iGDjf1goapy40Ol7PcCNv24="
                height="400px" alt=""></img>
        </div>
        <div class="col d-flex flex-column justify-content-center p-5">
            <h3>Welcome to DreamNest </h3>
            <p style={{textAlign:'justify'}}>Discover 100+ places in your hand with best lands.Help you to find the
                easiest ways to holidays.Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis neque,
                quasi sit eius architecto officiis doloribus recusandae tenetur et itaque nobis voluptates repellat
                libero culpa excepturi, ex explicabo obcaecati amet.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col p-5">
            <h2>About Us</h2>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis neque,
                quasi sit eius architecto officiis doloribus recusandae tenetur et itaque nobis voluptates repellat
                libero culpa excepturi, ex explicabo obcaecati amet.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quam tenetur suscipit ad itaque! Quaerat
                sapiente illum debitis minima laudantium ex ut impedit, facere, voluptas unde, hic numquam perferendis
                odio.
            </p>
            <ul>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>quasi sit eius architecto officiis doloribus recusandae</li>
                <li>tenetur et itaque nobis voluptates repellat</li>
                <li>libero culpa excepturi, ex explicabo obcaecati amet.</li>

            </ul>
            <a href="" class="btn btn-success">Click to Know More</a>
        </div>
        <div class="col mt-4 ">
            <img src="https://assets.simplotel.com/simplotel/image/upload/x_0,y_0,w_3556,h_2000,r_0/q_60,w_900,h_506,dpr_1,f_auto,fl_progressive,c_limit/summit-norling-resort-spa-gangtok/1_sxj4mj"
                height="70%" alt="im"></img>
        </div>
    </div>
</div>
<Footer/>
</>

  )
}

export default About