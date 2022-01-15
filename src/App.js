import {React,Component} from 'react';
import helpers from "./helper.js";
import Loader from "./loader.js";

const initialState ={
      question:"",
      answer_type:"",
      mandatory:true,
      multiple:false,
      radio_checkbox_array:[{"id":helpers.randomString(),"value":""}],
      loader_flag:false,
      action:"",
      metadata:"",
      answer_validation:"",
      minimum_select:"",
      readonly:false,
      placeholder:"",
      minimum_number:-Infinity,
      maximum_number:Infinity,
      minimum_date:"",
      maximum_date:"",
      minimum_time:"",
      maximum_time:"",
      lat:"",
      long:"",
      zoom:"",
      file_size:"",
      file_type:"",
      multiple_upload:true
}
export default class App extends Component{
    state={
      question:"",
      answer_type:"",
      mandatory:true,
      multiple:false,
      radio_checkbox_array:[{"id":helpers.randomString(),"value":"","default":false,"disabled":false}],
      loader_flag:false,
      action:"",
      metadata:"",
      answer_validation:"",
      minimum_select:"",
      readonly:false,
      placeholder:"",
      minimum_number:-Infinity,
      maximum_number:Infinity,
      minimum_date:"",
      maximum_date:"",
      minimum_time:"",
      maximum_time:"",
      lat:"",
      long:"",
      zoom:"",
      file_size:"",
      file_type:"",
      multiple_upload:true
    }


    // change the data on onChange
    changeData = (e) =>{       
      if(e.target.name === "answer_type"){
          console.log("change",this.state)
          if(e.target.value === "textbox"){
            this.setState({answer_type:"textbox"})
          }
          else if(e.target.value === "radio"){
            console.log("Radio",this.state);
            this.setState({answer_type:"radio"})
          }
          else if(e.target.value === "checkbox"){
            console.log("Checkbox");
            this.setState({answer_type:"checkbox"})
          }
          else if(e.target.value === "dropdown"){
            console.log("Dropdown");
            this.setState({answer_type:"dropdown"})
          }
      }
      else{
          this.setState({[e.target.name]:e.target.value})
      }  

      if(e.target.name === "answer_validation"){
          this.setState({
            minimum_select:"",
            readonly:false,
            placeholder:""
          })
      }
    }
    
  mandatoryChangeData=(e)=>{
        console.log(e.target.checked)
        this.setState({mandatory:e.target.checked})
        // console.log("state",this.state)
  }
     
  multipleChangeData=(e)=>{
      console.log(e.target.checked)
      this.setState({multiple:e.target.checked})
      // console.log("state",this.state)
  } 

  readonlyChangeData=(e)=>{
    console.log(e.target.checked)
    this.setState({readonly:e.target.checked})
    // console.log("state",this.state)
  } 

  multipleUploadFileChangeData=(e)=>{
    console.log(e.target.checked)
    this.setState({multiple_upload:e.target.checked})
    // console.log("state",this.state)
  } 
  
  changeCheckboxMinimumSelect=(e)=>{
    console.log(e.target.value)
    this.setState({minimum_select:e.target.value})
    // console.log("state",this.state)
  }

  // Dynamically add the more radio/checkbox buttons
  AddButton =(e)=>{
      this.setState({loader_flag:true})
      var joined = this.state.radio_checkbox_array.concat({"id":helpers.randomString(),"value":"","disabled":false,"default":false})
      this.setState({ radio_checkbox_array: joined,loader_flag:false })
      console.log(this.state.radio_checkbox_array)
  }
  
    // change the dropdown value in b/w radio <-> checkbox checkbox/radio button
    changeCheckboxRadioButton=(e)=>{
      console.log("id",e.target.id)
      console.log("value",e.target.value)
      this.setState({loader_flag:true})
      let new_obj = this.state.radio_checkbox_array
      this.state.radio_checkbox_array.map((elem,key)=>{
          if(elem.id === e.target.id){
            new_obj[key]["value"] = e.target.value
            return true
          }
      })
      this.setState({radio_checkbox_array:new_obj,loader_flag:false})
      // console.log(this.state)
    }

    // disable option button
    changeDisableCheckboxRadioButton = (e)=>{
      console.log("id",e.target.id)
      console.log("checkbox status",e.target.checked);
      this.setState({loader_flag:true})
      let new_obj = this.state.radio_checkbox_array
      this.state.radio_checkbox_array.map((elem,key)=>{
          if(elem.id === e.target.id){
            new_obj[key]["disabled"] = e.target.checked
            return true
          }
      })
      this.setState({radio_checkbox_array:new_obj,loader_flag:false})
      // console.log("inside option disabled",this.state)
    }

    // default option button
    changeDefaultCheckboxRadioButton = (e)=>{
      console.log("id",e.target.id)
      console.log("checkbox status",e.target.checked);
      this.setState({loader_flag:true})
      let new_obj = this.state.radio_checkbox_array
      this.state.radio_checkbox_array.map((elem,key)=>{
          if(elem.id === e.target.id){
            new_obj[key]["default"] = e.target.checked
            return true
          }
      })
      this.setState({radio_checkbox_array:new_obj,loader_flag:false})
      // console.log("inside option default",this.state)
    }

    
    // Delete the checkbox/radio button
    DeleteCheckboxRadioButton = async (e)=>{
        console.log("delete id",e.target.id)
        console.log("radio_checkbox_array",this.state.radio_checkbox_array)
        const apps = this.state.radio_checkbox_array.filter(item => item.id.toString() !== e.target.id.toString())
        console.log("apps",apps)
        this.setState({radio_checkbox_array:apps})
        console.log("after delete",this.state)
    }

    // To select the choice between "save & continue/save & view list"
    addclcikSubmit =(e)=>{
      console.log("onclick submit",e.target.id)
      this.setState({action:e.target.id})
    }

    // on form submit add question
    addQuestion = (e)=>{
      console.log("submit",e.target.id)
      e.preventDefault()
      console.log(this.state)
      let obj ={
        question:this.state.question,
        answer_type:this.state.answer_type,
      }

      //validation for Required/Mandatory fields
      obj["mandatory"] = this.state.mandatory

      //validation for Multiple fields
      obj["multiple"] = this.state.multiple

      //validation for metadata
      obj["metadata"] = this.state.metadata

      // add the options if not selected answer type as textbox
      if(this.state.answer_type === "radio" || this.state.answer_type === "checkbox" || this.state.answer_type === "dropdown" ){
          obj["answer_arr"] = this.state.radio_checkbox_array

          if(this.state.answer_type === "checkbox"){
              obj["minimum_select"] = this.state.minimum_select
          }
      }

      // Validations on Other dropdown field
      if(this.state.answer_type === "textbox"){
        obj["answer_validation"] = this.state.answer_validation
        
        if(["number","text","email","tel","date","time","editor"].indexOf(this.state.answer_validation) > -1){
          obj["placeholder"] = this.state.placeholder
          obj["readonly"] = this.state.readonly
        }

        // Validation on Number field for minimum and maximum
        if(this.state.answer_validation === "number" && (this.state.minimum_number || this.state.maximum_number)){
            if(this.state.minimum_number < this.state.maximum_number){
              obj["minimum_number"] = this.state.minimum_number
              obj["maximum_number"] = this.state.maximum_number
            }
            else{
              alert("Minimum Number should be less than Maximum Number")
              return
            }
        }

        // Validation on Date field for minimum and maximum
        if(this.state.answer_validation === "date" && (this.state.minimum_date || this.state.maximum_date)){
          if(this.state.minimum_date < this.state.maximum_date){
            obj["minimum_date"] = this.state.minimum_date
            obj["maximum_date"] = this.state.maximum_date
          }
          else{
            alert("Minimum Date should be less than Maximum Date")
            return
          }
        }

        // Validation on Time field for minimum and maximum
        if(this.state.answer_validation === "time" && (this.state.minimum_time || this.state.maximum_time)){
          if(this.state.minimum_time < this.state.maximum_time){
            obj["minimum_time"] = this.state.minimum_time
            obj["maximum_time"] = this.state.maximum_time
          }
          else{
            alert("Minimum Time should be less than Maximum Time")
            return
          }
        }
        
        // Validation on Map field for lat,long and zoom
        if(this.state.answer_validation === "map"){
          obj["lat"] = this.state.lat
          obj["long"] = this.state.long
          obj["zoom"] = this.state.zoom
        }

        // Validation on file field for size,type and multiple upload
        if(this.state.answer_validation === "file"){
          obj["file_size"] = this.state.file_size
          obj["file_type"] = this.state.file_type
          obj["multiple_upload"] = this.state.multiple_upload
        }
      }
      
      console.log("final obj-->",obj)
    }



  render(){
    return(
        <>
        {this.state.loader_flag ? <Loader/> 
            :

      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Add Property Fields</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">Home</li>
                  <li class="breadcrumb-item active">Add Property Fields</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">Add Property Fields</h3>
                  </div>
                  <form onSubmit = {this.addQuestion} enctype="multipart/form-data">
                  {/*<form enctype="multipart/form-data"> */}
                    <div class="card-body">
                    <div class="row mb-3">
                      <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Field Name:</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" name="question" required rows="1" onChange={this.changeData} value={this.state.question}/>
                      </div>
                    </div>

                    {/* title */}
                    <div class="row mb-3">
                      <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Field MetaInfo:</label>
                      <div class="col-sm-10">
                        <textarea class="form-control" name="metadata" required rows="2" onChange={this.changeData} value={this.state.metadata}/>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Field Mandatory</label>
                      <div class="col-sm-10">
                        <div class="col-auto">
                          <div class="form-check mt-1">
                            <input type="checkbox" name="mandatory" value={this.state.mandatory} defaultChecked={this.state.mandatory} class="form-check-input" onChange={this.mandatoryChangeData}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Field Multiple</label>
                      <div class="col-sm-10">
                        <div class="col-auto">
                          <div class="form-check mt-1">
                            <input type="checkbox" name="multiple" value={this.state.multiple} defaultChecked={this.state.multiple} class="form-check-input" onChange={this.multipleChangeData}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Field Type:</label>
                      <div class="col-sm-10">
                        <select name="answer_type" class="form-control" value={this.state.answer_type} required onChange={this.changeData} >
                          <option value="">Select</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">CheckBox</option>
                          <option value="dropdown">Dropdown</option>
                          <option value="textbox">Other</option>
                        </select>
                      </div>
                    </div>
                  {
                    this.state.answer_type === "checkbox" ?
                      <div class="row mb-3">
                        <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Minimum Select</label>
                        <div class="col-sm-10">
                          <input type="number" value={this.state.minimum_select} class="form-control" required onChange={this.changeCheckboxMinimumSelect} />
                        </div>
                      </div>
                    : ""
                  }
                    
                    <div class="appendDivOuter">
                      {this.state.answer_type !== "textbox" && this.state.answer_type !== "" ? (<><div class="row">
                          <div class="col-sm-2">&nbsp;</div>
                          <div class="col-sm-10">
                            <div class="plusBtn">
                              <button class="btn btn-warning btn-sm  mb-3" onClick={this.AddButton}><i class="fas fa-plus"></i></button>
                            </div>
                          </div>
                        </div>
                      </>) : ""}
                      {this.state.answer_type !== "textbox" && this.state.answer_type !== "" ? 
                        ( 
                          this.state.radio_checkbox_array.map((button,index)=>{
                          return ( <>
                            <div class="row mb-3">
                              <div class="col-sm-2">&nbsp;</div>
                              <div class="col-sm-10">
                                <div class="row mb-3">
                                  <div class="col-auto">
                                    <div class="form-check mt-1">
                                      <input type="checkbox" id={button.id} class="form-check-input" value={this.state.radio_checkbox_array[index].disabled} checked={this.state.radio_checkbox_array[index].disabled} onChange={this.changeDisableCheckboxRadioButton}/>
                                      <label class="form-check-label mr-2" for={button.id}>Disabled</label>
                                    </div>
                                    <div class="form-check mt-1">
                                      <input type="checkbox" id={button.id} class="form-check-input" value={this.state.radio_checkbox_array[index].default} checked={this.state.radio_checkbox_array[index].default} onChange={this.changeDefaultCheckboxRadioButton}/>
                                      <label class="form-check-label mr-2" for={button.id}>Default</label>
                                    </div>
                                  </div>
                                  
                                  <div class="col">
                                    <input type="text" id={button.id} value={this.state.radio_checkbox_array[index].value} class="form-control" required onChange={this.changeCheckboxRadioButton} />
                                  </div>

                                  <div class="col-auto">
                                    {this.state.radio_checkbox_array.length > 1 ? 
                                    <>
                                      <button type="button" class="btn btn-danger btn-sm" id={button.id} onClick={this.DeleteCheckboxRadioButton}><i aria-hidden="true" class="fa fa-trash"></i></button>
                                    </> : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                          )
                        })) : 
                        
                        this.state.answer_type === "textbox" 
                        ?
                        <>
                          <div class="row">
                            <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Field Input Type:</label>
                            <div class="col-md-10">
                              <select name="answer_validation" class="form-control" value={this.state.answer_validation} required onChange={this.changeData}>
                                  <option value="">Select</option>
                                  <option value="text">Text</option>
                                  <option value="number">Number</option>
                                  <option value="email">Email</option>
                                  <option value="date">Date</option>
                                  <option value="time">Time</option>
                                  <option value="file">File</option>
                                  <option value="tel">Phone Number</option>
                                  <option value="editor">Editor</option>
                                  <option value="map">Map</option>
                              </select>
                            </div>
                          </div>

                          <br/>
                          {
                            ["number","text","email","tel","date","time","editor"].indexOf(this.state.answer_validation) > -1 ?
                              <div class="row mb-3">
                                <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Placeholder:</label>
                                <div class="col-sm-10">
                                  <input type={((this.state.answer_validation === "tel"||this.state.answer_validation === "number") ? "number" : (this.state.answer_validation === "email" ? "email" :"text"))} name="placeholder" value={this.state.placeholder} class="form-control" onChange={this.changeData}/>
                                </div>
                              </div>
                            : ""
                          }

                          {
                            ["number","text","email","tel","date","time","editor"].indexOf(this.state.answer_validation) > -1 ?
                              <div class="row mb-3">
                                <label for="exampleInputEmail1" class="col-sm-2 col-form-label">Readonly:</label>
                                <div class="form-check mt-1">
                                  <input type="checkbox" name="readonly" value={this.state.readonly} defaultChecked={this.state.readonly} class="form-check-input" onChange={this.readonlyChangeData}/>
                                </div>
                              </div>
                            : ""
                          }

                          {/* Minimum number limit on number */}
                          {
                            this.state.answer_validation === "number" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Minimum Number</label>
                              <div class="col-sm-10">
                                <input type="number" name="minimum_number" value={this.state.minimum_number} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Maximum number limit on number */}
                          {
                            this.state.answer_validation === "number" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Maximum Number</label>
                              <div class="col-sm-10">
                                <input type="number" name="maximum_number" value={this.state.maximum_number} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 


                          
                          {/* Minimum number limit on date */}
                          {
                            this.state.answer_validation === "date" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Minimum Date</label>
                              <div class="col-sm-10">
                                <input type="date" name="minimum_date" value={this.state.minimum_date} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Maximum number limit on date */}
                          {
                            this.state.answer_validation === "date" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Maximum Date</label>
                              <div class="col-sm-10">
                                <input type="date" name="maximum_date" value={this.state.maximum_date} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Minimum time limit on time */}
                          {
                            this.state.answer_validation === "time" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Minimum Time</label>
                              <div class="col-sm-10">
                                <input type="time" name="minimum_time" value={this.state.minimum_time} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Maximum time limit on time */}
                          {
                            this.state.answer_validation === "time" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Maximum Time</label>
                              <div class="col-sm-10">
                                <input type="time" name="maximum_time" value={this.state.maximum_time} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 


                          {/* Default Latitude of Map */}
                          {
                            this.state.answer_validation === "map" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Default Latitude</label>
                              <div class="col-sm-10">
                                <input type="number" name="lat" value={this.state.lat} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Default Longitude of Map */}
                          {
                            this.state.answer_validation === "map" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Default Longitude</label>
                              <div class="col-sm-10">
                                <input type="number" name="long" value={this.state.long} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Default Zoom of Map */}
                          {
                            this.state.answer_validation === "map" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Default Zoom</label>
                              <div class="col-sm-10">
                                <input type="number" name="zoom" value={this.state.zoom} class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 


                          {/* Default File Size of File */}
                          {
                            this.state.answer_validation === "file" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">File Size</label>
                              <div class="col-sm-10">
                                <input type="number" name="file_size" value={this.state.file_size} placeholder="in KB" class="form-control" onChange={this.changeData} />
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Supported File Type of File */}
                          {
                            this.state.answer_validation === "file" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">File Upload Type</label>
                              <div class="col-sm-10">
                                <select name="file_type" class="form-control" value={this.state.file_type} required onChange={this.changeData}>
                                  <option value="">Select</option>
                                  <option value="image">Image</option>
                                  <option value="video">Video</option>
                                  <option value="word">Word</option>
                                  <option value="excel">Excel</option>
                                  <option value="pdf">Pdf</option>
                              </select>
                              </div>
                            </div>
                            : ""
                          } 

                          {/* Upload multiple files*/}
                          {
                            this.state.answer_validation === "file" ?
                            <div class="row mb-3">
                              <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label">Multiple Uploads</label>
                              <div class="form-check mt-1">
                                <input type="checkbox" name="multiple_upload" value={this.state.multiple_upload} defaultChecked={this.state.multiple_upload} class="form-check-input" onChange={this.multipleUploadFileChangeData}/> 
                              </div>
                            </div>
                            : ""
                          } 
               
                        </> 
                      : ""
                      }
                    </div>
                    <div class="row my-3">
                      <label class="col-sm-2 col-form-label">&nbsp;</label>
                      <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary float-left mr-2" onClick={this.addclcikSubmit} id="continue" >Save and Continue</button>
                        {/* <button type="submit" class="btn btn-primary1" id="view_list" onClick={this.addclcikSubmit} >Save and View List</button> */}
                      </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

                    }
        </>
      );
    }
  }
