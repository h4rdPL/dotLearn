using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class PdfFile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] FileContent { get; set; }

        public List<ClassEntities> Classes { get; set; }
    }
}
