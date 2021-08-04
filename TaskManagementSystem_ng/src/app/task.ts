
export interface Task{
    QuoteID: number,  // quote number
    Quote_Type:string,
    Contact:string,
    Task_Description : string,
    Due_Date: Date,
    Task_Type: string,
  }


  export interface TaskDetail{
    QuoteID: number,  // quote number
    Quote_Type:string,
    Contact:string,
    Task_Description : string,
    Due_Date: Date,
    Task_Type: string,
    Status: string,
  }