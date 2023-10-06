using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class ClassPdfFile
    {
        public int Id { get; set; }
        public int ClassId { get; set; }
        public ClassEntities Class { get; set; }
        public int PdfFileId { get; set; }
        public PdfFile PdfFile { get; set; }
    }
}
