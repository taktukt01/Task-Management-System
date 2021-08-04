using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Unity;
using TM_Infrastructure;
using TM_Core;
using TM_Core.Interface;
using Unity.AspNet.WebApi;
using System.Web.Mvc;
using System.Web.Http;

namespace TaskManagementSystem
{
    public class UnityContainerRegistration
    {

        public static IUnityContainer InitializeContainer()
        {
            //Initialize the container
            var container = new UnityContainer();
            //Register dependencies 
            container.RegisterType<ITaskRepository, TaskRepository>();

            GlobalConfiguration.Configuration.DependencyResolver = (new UnityDependencyResolver(container));

            return container;
        }


    }
}