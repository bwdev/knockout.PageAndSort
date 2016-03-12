function WidgetsViewModel(obj) {
    var self = this;
    self.Resource = ko.observable("/api/values");

    self.Id = ko.observable(obj == null ? null : obj.Id);
    self.Jack = ko.observable(obj == null ? null : obj.Jack);
    self.Box = ko.observable(obj == null ? null : obj.Box);

    self.Widgets = ko.observableArray([]);

    self.GetData = function () {
        $.getJSON(self.Resource(), function (data) {
            self.Widgets(data.slice(self.pageIndex() * self.pageSize(), (self.pageIndex() * self.pageSize()) + self.pageSize()));
        });
    }

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