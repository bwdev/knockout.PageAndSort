using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSideFilterSorting.Models
{
    public class DataGenerator
    {
        public static List<Widget> GetData(int howMany)
        {
            List<Widget> widgets = new List<Widget>();
            for (int i = 0; i < howMany; i++)
            {
                widgets.Add(new Widget { Id = i, Box = $"{i}{i}{i}{i}{i}", Jack = $"{i+1}{i + 1}{i + 1}{i + 1}{i + 1}" });
            }

            return widgets;
        }

        public static string RandomString(int length) {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

    public class Widget
    {
        public int Id { get; set; }
        public string Jack { get; set; }
        public string Box { get; set; }
    }
}