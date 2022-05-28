type props = { 
    db:string[]
}

export const RenderResult = (props:props) => {

    
    const renderfire = props.db.map((fire,index) => {
        console.log("fire",fire)
      return (
        <div className="resultCard">
          <p>
            {fire}
          </p>
        </div>
      )
    })
    return(
        <div>
            {renderfire}
        </div>

    )
}