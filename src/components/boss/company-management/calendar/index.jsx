{
    daysArray.map((d) => (
    <CellWrapper 
        key={d.format('DD-MM-YYYY')}
        //key={index}
        isWeekend={d.day() === 6 || d.day() === 0}
        >
        {
            !isCurrentDay(d) && d.format('D') ? 
                (
                    <>
                        <div>
                            {d.format('D')}
                        </div>
                        {
                            business_list && business_list.list.map((b, index) => (
                                <>
                                    {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
                                            (
                                                <div 
                                                    key={index}
                                                    className='calendar-cell-text'
                                                >
                                                    <Link to={`/my-business-by-id/${b._id}`}>
                                                        <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                        
                                                    </Link>
                                                </div>
                                            ) 
                                                :                                                      (
                                                null
                                            )
                                        }
                                    </>
                                
                                ))
                        } 
                    </>
                ) 
                    : 
                (
                    <>
                     <div className='calendar-current-day'>
                         {d.format('D')}  
                     </div>
                     
                        {
                            business_list && business_list.list.map((b, index) => (
                                <>
                                    {d._d.toISOString().split('T', 1)[0] === b.finish.split('T', 1)[0] ? 
                                            (
                                                <div 
                                                    key={index}
                                                    className='calendar-cell-text'
                                                >
                                                    <Link to={`/my-business-by-id/${b._id}`}>
                                                        <p className="bg-warning px-1 mx-1" style={{ cursor: "pointer" }}>{b.title}</p>
                                                        
                                                    </Link>
                                                </div>
                                            ) 
                                                :                                                      (
                                                null
                                            )
                                        }
                                    </>
                                
                                ))
                        } 
                        
                    </>
                )
        }
    </CellWrapper>
))}