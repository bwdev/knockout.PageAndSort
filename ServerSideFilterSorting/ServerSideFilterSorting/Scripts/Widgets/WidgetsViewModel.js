function WidgetsViewModel(obj) {
    var self = this;
    ko.utils.extend(self, new PagerViewModel("/api/values"));

    self.Id = ko.observable(obj == null ? null : obj.Id);
    self.Jack = ko.observable(obj == null ? null : obj.Jack);
    self.Box = ko.observable(obj == null ? null : obj.Box);

    self.Widgets = ko.observableArray([]);

    //self.GetData = function () {
    //    console.log(self.ServiceEndpoint());
    //    $.getJSON(self.ServiceEndpoint(), function (data) {
    //        self.Data(data.data);
    //    });
    //}

    self.pageSize = ko.observable(100),
    self.pageIndex = ko.observable(0),
    self.previousPage = function() {
        this.pageIndex(this.pageIndex() - 1);
    },
    self.nextPage = function() {
        this.pageIndex(this.pageIndex() + 1);
    }

    self.GetData();
}