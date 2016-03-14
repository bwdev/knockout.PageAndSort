using ServerSideFilterSorting.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerSideFilterSorting.Controllers
{
    public class ValuesController : ApiController
    {
        // GET api/values
        public dynamic Get(int? page, int? pageSize)
        {
            page = page ?? 1;
            pageSize = pageSize ?? 100;
            int dataCount = 2000;
            return new { @count = dataCount, @page = page, @pageSize = pageSize, @data = DataGenerator.GetData(dataCount, page.Value, pageSize.Value).OrderBy(o => o.Id) };
        }
    }
}
