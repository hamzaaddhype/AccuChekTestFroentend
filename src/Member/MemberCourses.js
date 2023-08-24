import React, { useRef } from 'react';
import  { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import ReactPlayer from 'react-player'
import Swal from 'sweetalert2';
const MemberCourses = () => {
// const [getProducts, setProducts] = useState([]);
const [getFalseStaus_cources, setFalseStausCources] = useState([]);
// const [isloading, setLoading] = useState(true);
// const [startTime, setStartTime] = useState(null);
// const [isVideoPaused, setVideoPaused] = useState(true);
// const [endTime, setEndTIme] = useState(null);
// const [timeWatched, setTimeWatched] = useState(0);
// const [videoCompleted, setVideoCompleted] = useState(false);
// const playerRef = useRef(null);
// const [progress, setProgress] = useState(0);

    // const [getProducts, setProducts] = useState([]);
    // const [currentlyWatchedIndex, setCurrentlyWatchedIndex] = useState(null);
    // const [videoStates, setVideoStates] = useState([]);
    // const playerRef = useRef(null);
    const [getProducts, setProducts] = useState([]);
    const [videoStates, setVideoStates] = useState([]);
    const playerRefs = useRef([]);
  
    useEffect(() => {
      getData();
      getFalseStausCources()
    }, []);
  
    const handleTime = (index, { playedSeconds }) => {
      const newVideoStates = [...videoStates];
      newVideoStates[index] = {
        ...newVideoStates[index],
        endTime: playedSeconds,
      };
      setVideoStates(newVideoStates);
    };
  
    const handleVideoEnded = (index) => {
      const newVideoStates = [...videoStates];
      newVideoStates[index] = {
        ...newVideoStates[index],
        videoCompleted: true,
      };
      setVideoStates(newVideoStates);
    };
  
    const handleVideoStart = (index) => {
      const newVideoStates = [...videoStates];
      newVideoStates[index] = {
        startTime: 0,
        endTime: 0,
        videoCompleted: false,
      };
      setVideoStates(newVideoStates);
      playerRefs.current[index].seekTo(0);
    };
      
    const getData = async () => {
        let result = await fetch("http://128.199.221.11:5000/Admin/getCources");
        result = await result.json();
        if(result<0){
          result.send("<h1>No Data!</h1>")
        }
        console.log("Result from API Members list", result);
        setProducts(result);
        console.log(result._id);
        // setLoading(false)
        setVideoStates(Array(result.length).fill({startTime:0,endTime:0,videoCompleted:false}));
      };
       const getFalseStausCources = async () => {
         let result = await fetch("http://128.199.221.11:5000/Admin/getCources");
         result = await result.json();
         console.log(result)  
         console.log("hamzano stratus found")
         if(result<0){
           result.send("<h1>No Data!</h1>")
         }
        console.log("Result from API Members list", result);
         setFalseStausCources(result);
         console.log(result._id);
        //  setLoading(false)
       };
     

      
  return (
    <>
         {/* <div className="c" id="admin_user"> */}
         <div className='position-absolute' style={{marginLeft:'20%',width:"80%", marginTop:"07%"}}>
            {/* First Container */}
            <div className="container border mt-5 rounded bg-light">
                <div className='row ms-1'>
                    <div className='col justify-content-start mt-3'>
                        <h3>Courses</h3>
                    </div>
                    <div className='col-sm-3 justify-content-end'>
                        <input className='justify-content-end mt-4 ms-5' type='Date' placeholder='Date'></input>
                    </div>
                </div>


                <div className='row mt-4 ms-2'>
                    <div className='col-2 text-primary' >
                        <p>Medical(4)</p>
                    </div>
                    <div className='col font-weight-normal'>
                        <p>Products(2)</p>
                    </div>
                    <div className='row'><hr></hr></div>
                </div>
                {getProducts.map((product,index) => {
                        

return (
            <div className='row ms-0 mb-5' key={product._id}>
            <div className='col-md-3 video_Thumbnail' style={{ height: '10%' }}>
                {/* Video Player */}
                <ReactPlayer
                ref={(ref) => (playerRefs.current[index] = ref)}
                url={`http://128.199.221.11:5000/uploads/${product.image}`}
                controls={true}
                onProgress={(state) => handleTime(index, state)}
                onEnded={() => handleVideoEnded(index)}
              />
              {/* <p>Progress {index + 1}: {((videoStates[index].endTime - videoStates[index].startTime) * 100).toFixed(2)}%</p> */}
            </div>
            <div className='col mt-2'>
                {/* ... (product details) */}
                <div className='row'>
                  <p>{product.name}</p>
                  <p>{product.discription}</p>
                  <div className='d-flex justify-content-between ps-0'>
                  <i className='fa-regular fa-clock ms-3'> &nbsp; {product.duration}</i>
                  <img src='/FullStar.png' width='30px' height='30px' alt=''/>
                  </div>
                </div>
            </div>
            <div className='col-md-3 mt-3'>
            </div>
            <div className='col-md-3 mt-3'>
                {/* <button className='btn btn-primary ms-5 text-light'>Continue</button> */}
                <button
                className='btn member_cources_button ms-5 text-light'
                onClick={() => handleVideoStart(index)}
                disabled={videoStates[index].videoCompleted}
              >
                Continue
              </button>
                <div key={product._id}>
                <p>Progress</p>
                {/* Progress Bar */}
                <div className='progress'>
                    <div
                        className='progress-bar'
                        role='progressbar'
                        // style={{ width: `${progress}%` }}
                        style={{
                            width: `${((videoStates[index].endTime - videoStates[index].startTime) * 9).toFixed(2)}%`,
                          }}
                        // aria-valuenow={progress}
                        aria-valuenow={((videoStates[index].endTime - videoStates[index].startTime) * 9).toFixed(2)}
                        aria-valuemin='0'
                        aria-valuemax='100'
                    >
                        {/* {videoCompleted ? '100.00% Complete' : `${progress.toFixed(2)}% Complete`} */}
                        {videoStates[index].videoCompleted
                    ? '100.00% Complete'
                    : `${((videoStates[index].endTime - videoStates[index].startTime) * 10).toFixed(2)}% Complete`}
                    </div>
                </div>
            </div>
        </div>
            </div>
    
    );
})}
            
</div>
            <br/>

            
            {/* Second Container */}
            <div className='container border mt-5 rounded bg-light'>
                <div className='row ms-1'>
                    <div className='col justify-content-start mt-3'>
                        <h3>Recommended Courses</h3>
                    </div>
                    <div className='col-sm-3 mt-3'>
                        <a href='' className=' ms-5 text-dark'>See all <i className='fa fa-greater-than'></i> </a>
                    </div>
                </div>
                <br/>

                <div className='row ms-0'>
                {getFalseStaus_cources.map((falseStaus)=>{
                    return(
                        <div  className='col-md-2 col-sm-2 border bg-white rounded p-0 m-2' style={{ width:"23%"}}>
                        <div className='row auto_height'>
                            <ReactPlayer
                                // ref={playerRef}
                                url={`http://128.199.221.11:5000/Admin/getCources`}
                                controls={true}            
                            />
                        </div>
                        <div className='row'>
                            <p className='fs-6 mt-2 ms-1 fw-normal'> {falseStaus.name}</p>
                        </div>
                        <div className='row'>   
                            <i className='fa-regular fa-clock ms-3'> &nbsp; {falseStaus.duration}</i>
                        </div>
                        <div className='row mt-2'> 
                            <div className='col-md-2 m-0 p-0 me-2' style={{display:"flex",justifyContent:"right", height:"03%",width:"20%"}}>
                                <img  src='/Award-star.png' style={{height:"03%",width:"60%"}}></img>
                            </div>
                            <div className='col-md-2 m-0 p-0' style={{height:"03%",width:"20%"}}>
                                <span>{falseStaus.points}</span>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <div class="col-md-12" style={{display:"flex",justifyContent:"right"}}>
                                <button width="60%" type="button" class="btn me-2 mb-2" style={{width:"60%",backgroundColor:"#8EB927"}}>Start</button>
                            </div>
                        </div>
                    </div>
                    )
                })}
                  </div>
            </div>
        </div>
    </>
  )
}

export default MemberCourses;