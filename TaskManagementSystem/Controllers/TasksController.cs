using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TM_Infrastructure;
using TM_Core;
using TM_Core.Interface;

namespace TaskManagementSystem.Controllers
{
    
    public class TasksController : ApiController
    {

        List<TaskUI> Tasks;
        ITaskRepository _iTaskRepository;
        public TasksController(ITaskRepository iTaskRepository)
        {
            _iTaskRepository = iTaskRepository;
        }

        
        // GET: api/Tasks
        public List<TaskUI> GetTasks()
        {

            return _iTaskRepository.GetAllTasks();
        }

        // GET: api/Tasks/5
        [ResponseType(typeof(TaskUI))]
        public IHttpActionResult GetTask(int id)
        {
            TaskUI task = _iTaskRepository.ViewTask(id);
            if (task == null)
            {
                var message = string.Format("Task with id = {0} not found", id);
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.NotFound, message));
            }

            return Ok(task);
        }

        // PUT: api/Tasks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTask(int id, TaskUI task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _iTaskRepository.UpdateTask(id, task);


            return Ok(task);
        }

        // POST: api/Tasks
        [ResponseType(typeof(TaskUI))]
        public IHttpActionResult PostTask(TaskUI task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _iTaskRepository.CreateTask(task);

            return CreatedAtRoute("DefaultApi", new { id = task.QuoteID }, task);
        }

        // DELETE: api/Tasks/5
        [ResponseType(typeof(Task))]
        public IHttpActionResult DeleteTask(int id)
        {
            TaskUI task = _iTaskRepository.DeleteTask(id);
            if (task == null)
            {
                var message = string.Format("Task with id = {0} not found", id);
                throw new HttpResponseException(
               Request.CreateErrorResponse(HttpStatusCode.NotFound, message));
            }

            return Ok(task);
        }


    }
}