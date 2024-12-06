import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaRegEye } from "react-icons/fa";
import { Modal } from 'antd';
import { BsCart4 } from "react-icons/bs";
import { MdElectricBolt } from "react-icons/md";
import CartContext from '../context/CartContext';
import { useContext } from 'react';
import {toast} from 'react-toastify'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



const Home = () => {
  let ctx = useContext(CartContext)
  console.log(ctx)
  let search = ctx.searchValue
  const [alldata, setallData] = useState([]);

  const [loading , setLoading] = useState(false)
  
  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('https://dummyjson.com/products?limit=0')
    const data = await res.json()
    console.log(data.products)
    setallData(data.products)
    setLoading(false)


  }


  useEffect(() => {
    fetchData()
  }, [])



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObj, setSelectedObj] = useState('')

  const showModal = (ans) => {
    console.log(ans)
    setIsModalOpen(true)
    setSelectedObj(ans);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //pagination work start
  
  let filteredArr = alldata.filter((ele)=>ele.title.toLowerCase().includes(search) || ele.category.toLowerCase().includes(search) || ele.brand?.toLowerCase().includes(search) )
  console.log(filteredArr)


  const [currentPage , setcurrentPage] =useState(1)
  let itemperPage = 12;
  let lastPage = currentPage*itemperPage;
  let firstPage = lastPage -itemperPage;
  let slicedArr = filteredArr.slice(firstPage,lastPage)
  console.log(slicedArr)

  let noofPages = Math.ceil(filteredArr.length/itemperPage)

  let btnArr=[]
  for(let i=1;i<=noofPages;i++){
    btnArr.push(i)
  }

  const handleNumberClick =(ans)=>{
    setcurrentPage(ans)
  }
  const handleNext=()=>{
    if(currentPage<noofPages){
      setcurrentPage(currentPage+1)
  }
  }
  const handlePrev=()=>{
    if(currentPage>1){
      setcurrentPage(currentPage-1)
    }}
    
    // let arr1 = new Array(10).fill('');
    // console.log(arr1);


  return (
  <div> 
 
    
     { 
      loading === true ?   <div className='w-[90%] mt-1 grid  grid-cols-12  '>
      {
        Array(8).fill().map((digits)=>{
          return <div className='h-[500px] w-[500px]    lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12'>
             <SkeletonTheme height={'100%'}  baseColor="#202020" highlightColor="#444">
      
        <Skeleton  count={1} />
      
    </SkeletonTheme>
            
          </div>
          
        })
      }
     </div>: <div >
    <div>

      <Modal width={800} title="ViewDetails" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div>

            <div className='flex'> <div>  <img height={400} width={400} src={selectedObj.thumbnail} alt="" /> </div>
              <div>
                <p className='text-xl'><b>Title: </b> {selectedObj.title}</p>
                <p><b>Brand: </b> {selectedObj.brand}</p>
                <p><b>Stock: </b> {selectedObj.stock}</p>

                <p><b>MinimumOrderQuantity: </b> {selectedObj.minimumOrderQuantity}</p>
                <p><b>ReturnPolicy: </b> {selectedObj.returnPolicy}</p>
                <p><b>Shipping Information </b> {selectedObj.shippingInformation}</p>
                <p> {selectedObj.description}</p>
                <div>
                <h3 className='text-center font-serif'>Reviews:</h3>
                <div className='grid grid-cols-12 gap-2'>

                  {selectedObj?.reviews?.map((ele) => {
                    return <div className='lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12 p-6 bg-amber-100 rounded-lg' >
                      <p><>UserName: </> {ele.reviewerName}</p>
                      
                      <p><>Comment: </> {ele.comment}</p>
                      <p><>Rating:</>{ele.rating}</p>
                      <p><>UserEmail: </> {ele.reviewerEmail}</p>
                    </div>
                  })
                  }
                </div>
              </div>

              </div>
             
            </div>

          </div></div>

      </Modal>
    </div>

    <div className='grid gap-2 px-5 py-5 grid-cols-12'>
      {
        slicedArr.map((element, i) => {
          return (


            <Card className='flex flex-col relative lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12'>
              <FaRegEye onClick={() => showModal(element)} className='absolute right-2 top-3 text-xl' />

              <CardMedia
                component="img"
                alt='img'
                className='h-54 '
                image={element.thumbnail}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {element.title}
                </Typography>
                <Typography className='leading-4' variant="body2" sx={{ color: 'text.secondary' }}>
                  {element.description}

                </Typography>


                <div className='flex gap-2'>
                  <h1 className='text-lg cursor-pointer '> ₹{element.price} </h1>
                  <h1 className='text-lime-500'> {element.availabilityStatus}</h1>
                </div>
              </CardContent>
              <CardActions>

                <Button className='gap-1  hover:text-white hover:bg-blue-600'onClick= {()=>ctx.buyItem(element)} size="small">Buy Now <MdElectricBolt /></Button>

                <Button className='gap-2 hover:text-white hover:bg-blue-600' onClick= {()=>ctx.addCartitem(element)} size="small">Add to Cart  <BsCart4 /></Button>
              </CardActions>
            </Card>


          )
        }




        )
      }
    </div>

    

<nav className=' mx-auto ' aria-label="Page navigation example">
<ul class="flex flex-wrap text-wrap  justify-center ">
  <li>
    <a href="#"  onClick={()=>handlePrevious()} class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
  </li>
 {
  btnArr.map((nums)=>{
  return  <li onClick={()=>handleNumberClick(nums)}>
  <a href="#"  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{nums}</a>
</li>})
 }
  <li>
    <a href="#" onClick={()=>handleNext()} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
  </li>
</ul>
</nav>


  </div>
   }
  </div>
)
}

export default Home
