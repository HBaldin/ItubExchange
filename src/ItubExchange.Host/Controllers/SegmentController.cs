using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace ItubExchange.Host.Controllers
{
    [Route("[controller]")]
    public class SegmentController : Controller
    {
        private readonly ILogger<SegmentController> logger;
        private readonly ISegmentRepository segmentRepository;

        public SegmentController(ILogger<SegmentController> logger,
            ISegmentRepository segmentRepository)
        {
            this.logger = logger;
            this.segmentRepository = segmentRepository;
        }

        [HttpGet]
        public IEnumerable<Segment> Get()
        {
            return segmentRepository.GetAll();
        }

        [HttpPost]
        public void Post(Segment segment)
        {
            segmentRepository.Create(segment);
        }

        [HttpPatch]
        public void Update(Segment segment)
        {
            segmentRepository.Update(segment);
        }

        [HttpDelete]
        public void Delete(Guid id)
        {
            var segment = segmentRepository.Get(id);
            segmentRepository.Delete(segment);
        }
    }
}
