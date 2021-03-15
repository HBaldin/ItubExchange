using ItubExchange.Core.Entities;
using ItubExchange.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

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
        public IActionResult Get()
        {
            var segments = segmentRepository.GetAll();
            return Ok(segments);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Segment segment)
        {
            segmentRepository.Create(segment);
            return Created("", segment);
        }

        [HttpPatch]
        public IActionResult Update([FromBody] Segment segment)
        {
            if (segment == null)
                return BadRequest("Nenhum segmento recebido");

            if (segment.Id == Guid.Empty)
                return BadRequest("Id do segmento não informado");

            var seg = segmentRepository.Get(segment.Id);

            if (seg == null)
                return NotFound("Segmento não encontrado");

            segmentRepository.Update(segment);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(Guid id)
        {
            var segment = segmentRepository.Get(id);
            segmentRepository.Delete(segment);
            return Ok();
        }
    }
}
