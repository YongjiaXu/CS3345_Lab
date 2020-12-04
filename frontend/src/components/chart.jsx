import React from 'react'
import {Bar, Pie} from 'react-chartjs-2'

export class Chart extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            data : this.props.content.data,
            country: this.props.content.country,
            title: this.props.content.title
        }
    }

    render(){
        return(

            <div>
                {
                    this.state.data ? 

                    <div style={{alignContent: 'center' , marginLeft: '9%', marginRight: '10%'}}>
                        <h2 style={{textAlign: 'center'}}>{this.state.title}</h2>
                        <Bar

                            data={this.state.data}
                            width={10}
                            height={300}
                            options={{
                                maintainAspectRatio: false
                            }}

                        />

                    </div>

                    :

                    (null)
                }
                <br/>
                <br/>
                <hr></hr>
                {
                    this.state.data === null ?

                    <div style={{textAlign: 'center', marginTop: '2%'}}>
                        <h2>Chart not available...</h2>
                    </div>

                    :

                    (null)
                }
            </div>
        );
    }
}