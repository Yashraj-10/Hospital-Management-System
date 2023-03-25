import $ from 'jquery';
import jQuery from 'jquery';
const SelectDate = () => {
    var array = ["2023-03-14", "2023-03-11", "2023-03-26"];

    $(function () {
        $("input").datepicker({
            dateFormat: "yy-mm-dd",
            beforeShowDay: function (date) {
                var string = jQuery.datepicker.formatDate("yy-mm-dd", date);
                return [array.indexOf(string) !== -1];
            },
        });
    });

    return (
        <div class="form-group">
            <label for="date"></label>

            <input
                type="date"
                name="date"
                class="form-control"
                placeholder=""
                required
                readonly
            />
        </div>
    );
}

export default SelectDate;