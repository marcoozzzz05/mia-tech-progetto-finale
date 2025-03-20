import category from "../category.json"

function Home() {
    console.log(category);
  return (
    <>
    <div className="flex">
        {category.map((item, index) => { 
            return (
            <div key={ index }>
                <img src={`/src/assets/img/category/${item.img}`} />
                <span> { item.name } </span>
            </div>
            )
        })}
      
    </div>
    </>
  )
}

export default Home
