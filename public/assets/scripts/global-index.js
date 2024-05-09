let _token = $('input[name="_token"]').val();
$(document).ready(function (){
    $('#index_id').trigger('change')

    localStorage.setItem("mapIso", '');
    localStorage.setItem("toggleOpenFlag", '0');

    localStorage.setItem("cpToggleOpenFlag", '0');

    $(document).on('click', '.close-index', function() {
        $("#countryScoreIndex").toggleClass('openIndex');
        localStorage.setItem("mapIso", '');
        localStorage.setItem("toggleOpenFlag", '0');
        $("#width-size-change").removeClass('dynamic-width');
        $("#countryProfileSidebar").toggleClass('openIndex');
        localStorage.setItem("cpToggleOpenFlag", '0');
    });

    generateMap();
});

// Interactive map page
map_root = "";
function generateMap(iso = ""){
    $('#ajaxLoader').hide();
    am5.ready(function() {
        if(map_root){
            map_root.dispose();
        }

        map_root = am5.Root.new("mapSelectIndex");

        map_root.setThemes([
            am5themes_Animated.new(map_root)
        ]);

        let chart = map_root.container.children.push(am5map.MapChart.new(map_root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator()
        }));

        let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(map_root, {
            geoJSON: am5geodata_worldLow,
            // fill: am5.color(0x677935),
            stroke: am5.color(0xffffff),
            exclude: ["AQ"]
        }));

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color("#00678f")
        });
        polygonSeries.mapPolygons.template.states.create("active", {
            fill: map_root.interfaceColors.get("primaryButtonHover")
        });

        let flag_dir = "../assets/images/flags";

        polygonSeries.mapPolygons.template.setAll({
            tooltipHTML: "<img style='width: 100px; height: 50px;' src=" + flag_dir + "/{id}.SVG>" + "<span style='color: #ffffff'>{name}",
            toggleKey: "active",
            interactive: true,
            templateField: "polygonSettings",
            stroke: am5.color(0xffffff),
            strokeWidth: 1,
            // fillOpacity: 0.5
        });

        let previousPolygon;

        if(iso){
            polygonSeries.data.setAll([{
                id: iso,
                // value: 100,
                polygonSettings: {
                    fill: am5.color(0xb30000)
                }
            }
            ])
        }

        polygonSeries.mapPolygons.template.on("active", function (active, target) {
            if (previousPolygon && previousPolygon != target) {
                previousPolygon.set("active", false);
            }
            if (target.get("active")) {
                let target_data = target.dataItem;
                let iso = target_data._settings.id;
                // polygonSeries.zoomToDataItem(target_data);
                mapOnClick(iso)
            }
            else {
                chart.goHome();
            }
            previousPolygon = target;
        });

        chart.set("zoomControl", am5map.ZoomControl.new(map_root, {}));

        chart.appear(500, 100);
    });
}

function mapOnClick(iso){
    if(localStorage.getItem("toggleOpenFlag") == 0){
        $("#countryScoreIndex").toggleClass('openIndex');
        localStorage.setItem("mapIso", iso);
        localStorage.setItem("toggleOpenFlag", '1');
        $("#width-size-change").addClass('dynamic-width');
    }

    $('#ajaxLoader').css('display', 'block');

    let index_id = $('#index_id').val();
    let sub_index_id = $('#sub_index_id').val() ? $('#sub_index_id').val() : 0;
    let indicator_id = $('#indicator_id').val() ? $('#indicator_id').val() : 0;

    $.ajax({
        url: '/get-country-info-by-iso',
        type: 'post',
        data: {
            _token: _token,
            iso: iso,
            index_id: index_id,
            sub_index_id: sub_index_id,
            indicator_id: indicator_id
        },
        success: function (response) {
            $("#country_iso").val(iso).change();

            if (response.responseCode == 1) {
                $('#sdr-year').html("SDR " + response.sdr_year);
                let flag_dir = "../assets/images/flags"
                $('#score-flag').attr("src", flag_dir + '/' + response.country_info.iso + '.SVG');
                $('#c-name').html(response.country_info.name);
                $('#c-score-value-label').html(response.last_score_rank ? response.last_score_rank.score_value_flag + ":" : "Score:");
                $('#c-score-value').html(response.last_score_rank ? response.last_score_rank.score_value : "-");
                $('#c-rank').html(response.last_score_rank ? response.last_score_rank.country_rank : "-");

                $('#scoreChart').empty();

                if(response.score_data != ''){
                    $('#scoreChart').css('height', '250px');
                    trendChart(response.score_data);
                }else{
                    $('#scoreChart').css('height', '80px');
                    $('#scoreChart').html('<div class="gi-alert-box" role="alert"><h5 class="gi-alert-text"><i class="fa fa-info-circle" aria-hidden="true"></i> No Trend Data</h5></div>')
                }

            }

            $('#ajaxLoader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
};

let root = '';
function trendChart(score_data) {
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
    if(root) root.dispose();
    root = am5.Root.new("scoreChart");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    root.dateFormatter.setAll({
        dateFormat: "yyyy",
        dateFields: ["valueX"]
    });

    let data = [];
    $.each(score_data, function (i, row) {
        data.push({
            date: row['year'].toString(),
            value: parseFloat(row['score_value'])
        });
    });

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX:true
        })
    );

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.5,
            groupData: false,
            baseInterval: {
                timeUnit: "year",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                pan:"zoom",
                minGridDistance: 50
            }),
            tooltip: am5.Tooltip.new(root, {})
        })
    );

    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
        })
    );

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
        am5xy.LineSeries.new(root, {
            minBulletDistance: 10,
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "Score/Value: {valueY}"
            })
        })
    );

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy",
        dateFields: ["date"]
    });

    series.data.setAll(data);

    series.bullets.push(function() {
        let circle = am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill"),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 2
        });

        return am5.Bullet.new(root, {
            sprite: circle
        });
    });

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis
    }));
    cursor.lineY.set("visible", false);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000, 100);
    chart.appear(1000, 100);
}

function getSubIndexByIndexId(indexId){
    $("#sub_index_id").empty();
    $("#indicator_id").empty().html('<option value="">Select Indicator</option>');
    if (indexId != ''){
        $("#index_id").after('<span class="loading_data">Loading...</span>');
        $.ajax({
            type: "post",
            url: "/get-global-sub-index-by-index-id",
            data: {
                _token: _token,
                indexId: indexId
            },
            success: function (response) {
                let option = '<option value="">Select Sub Index</option>';
                if (response.responseCode == 1) {
                    if (response.data != ''){
                        $.each(response.data, function (id, value) {
                            option += '<option value="' + id + '">' + value + '</option>';
                        });
                        $("#sub_index_id").html(option);
                        $("#index_id").next().hide('slow');
                    }else{
                        getIndicatorByIndexSubIndexId();
                        $("#index_id").next().hide('slow');
                    }
                }
            }
        });
    }
}

function getIndicatorByIndexSubIndexId(subIndexId = ''){
    let indexId = $('#index_id').val();
    if (indexId != ''){
        $("#sub_index_id").after('<span class="loading_data">Loading...</span>');
        $.ajax({
            type: "post",
            url: "/get-indicator-by-index-sub-index-id",
            data: {
                _token: _token,
                indexId: indexId,
                subIndexId: subIndexId
            },
            success: function (response) {
                let option = '<option value="">Select Indicator</option>';
                if (response.responseCode == 1) {
                    $.each(response.data, function (id, value) {
                        option += '<option value="' + id + '">' + value + '</option>';
                    });
                }
                $("#indicator_id").html(option);
                $("#sub_index_id").next().hide('slow');
            }
        });
    }
}

//Line chart data get multiple and single

isoArray = [];
function country_wise_line_data(iso, country_name) {
    const selected = $("#country-" + iso).hasClass('clicked');
    if (!selected) {
        get_line_chart_data(iso, country_name)
    } else {
        $("#country-" + iso).removeClass('country-hover clicked');
        remove_line_from_chart(iso);
    }
}

function get_line_chart_data(iso, country_name) {
    let index_id = $('#index_id').val();
    let sub_index_id = $('#sub_index_id').val() ? $('#sub_index_id').val() : 0;
    let indicator_id = $('#indicator_id').val() ? $('#indicator_id').val() : 0;
    let year = $('#year').val() ? $('#year').val() : 0;

    const point_str = [];
    const date_str = [];
    $.ajax({
        type: 'post',
        url: '/get-country-score-rank-for-line-chart',
        data: {
            _token: _token,
            iso : iso,
            index_id: index_id,
            sub_index_id: sub_index_id,
            indicator_id: indicator_id,
            year: year
        },
        success: function (response) {
            if (response.data.length > 0){
                response.data.forEach(function (element) {
                    point_str.push(element.score_value);
                    date_str.push(element.year);
                });

                if ($(".country-name").hasClass('country-hover clicked') || isoArray.length > 1) {
                    make_multiple_line_chart(point_str, date_str, iso, country_name)
                    isoArray.push(iso)
                } else {
                    make_line_chart(point_str, date_str, iso, country_name)
                    isoArray.push(iso)
                }

                $("#country-" + iso).addClass('country-hover clicked');
            }else{
                $("#country-" + iso).removeClass('country-hover clicked');
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'No data found for this country!'
                })
            }

        },
        error: function (xhr) {
        }
    });
}

let lineChart = '';

function make_line_chart(point_str, date_str, iso, country_name) {
    const config = {
        type: 'line',
        data: {
            labels: date_str,
            datasets: [{
                iso: iso,
                label: country_name,
                backgroundColor: 'rgba(34, 167, 240, 1)',
                borderColor: 'rgba(34, 167, 240, 1)',
                fill: false,
                data: point_str

            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    grid: {
                        color: 'rgba(128,151,177, 0.3)',
                        borderDash: [3, 3],
                        drawTicks: false,
                        borderColor: '#424b5f',
                    },
                },
                x: {
                    grid: {
                        color: 'rgba(128,151,177, 0.3)',
                        borderDash: [3, 5],
                        drawTicks: false,
                        borderColor: '#424b5f'
                    },
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    usePointStyle: true,
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    limits: {
                        x: {
                            minRange: 3
                        },
                    },
                }
            }
        }
    };

    if (lineChart) lineChart.destroy(); //destroy prev chart instance
    const ctx2 = document.getElementById('line-canvas').getContext('2d');
    $('#gi-alert-box').hide();
    lineChart = new Chart(ctx2, config);
}

function make_multiple_line_chart(point_str, date_str, iso, country_name) {
    const color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    const newDataset = {
        iso: iso,
        label: country_name,
        backgroundColor: color,
        borderColor: color,
        data: point_str,
        fill: false,
    };

    lineChart.data.datasets.push(newDataset);
    lineChart.update();
}

function remove_line_from_chart(iso) {
    let dataset = lineChart.data.datasets;
    $.each(dataset, function (key, value) {
        if (value) {
            if (value.iso.toString() == iso.toString()) {
                dataset.splice(key, 1);
            }
        }
    });
    isoArray.length = 0;
    lineChart.update();
}

function deselectAllLineData(){
    $('.clicked').each(function (){
        let iso = $(this).attr('data-value')
        $(this).removeClass('country-hover clicked');
        remove_line_from_chart(iso);
    })
}

$('#exportCompareLineChart').click(function (event) {
    /* save as image */
    let link = document.createElement('a');
    link.href = lineChart.toBase64Image();
    link.download = 'lineChart.png';
    link.click();
});

function loadRegionWiseCountryList(regionId, subRegionId, countryGroupId, page){
    $('#ajaxLoader').css('display', 'block');

    let index_id = $('#index_id').val();
    let sub_index_id = $('#sub_index_id').val() ? $('#sub_index_id').val() : 0;
    let indicator_id = $('#indicator_id').val() ? $('#indicator_id').val() : 0;
    let year = $('#year').val() ? $('#year').val() : 0;
    let country_iso = $('#country_iso').val() ? $('#country_iso').val() : 0;
    if (regionId == ''){
        regionId = $('.region_id').val()
    }

    $.ajax({
        type: 'post',
        url: '/get-country-by-filter',
        data: {
            _token: _token,
            regionId : regionId,
            subRegionId : subRegionId,
            countryGroupId : countryGroupId,
            index_id: index_id,
            sub_index_id: sub_index_id,
            indicator_id: indicator_id,
            year: year,
            country_iso: country_iso,
            page : page
        },
        success: function (response) {
            if (response.responseCode == 1){
                if(page == 'rank'){
                    $('#rankCountryList').html(response.html)
                }else{
                    $('#countryList').html(response.html)
                    if (isoArray.length > 0){
                        $('.country-name').each(function (){
                            let elementId = $(this).attr('id');
                            $.each(isoArray, function(index, item) {
                                if (elementId == 'country-'+item){
                                    $('#'+elementId).addClass('country-hover clicked')
                                }
                            });
                        })
                    }
                    var option = '<option value="">Select Sub Region</option>'
                    $.each(response.subRegionList, function(index, item) {
                        let selected = '';
                        if (subRegionId == index){
                            selected = 'selected';
                        }
                        option += '<option '+selected+' value="'+index+'">'+item+'</option>';
                    });
                    $('.sub_region_id').html(option)
                }
            }

            $('#ajaxLoader').hide();
        },
        error: function (xhr) {
        }
    });
}

function loadCountryProfile(iso){
    $('#ajaxLoader').css('display', 'block');

    let index_id = $('#index_id').val();
    let sub_index_id = $('#sub_index_id').val() ? $('#sub_index_id').val() : 0;
    let indicator_id = $('#indicator_id').val() ? $('#indicator_id').val() : 0;
    let year = $('#year').val() ? $('#year').val() : 0;

    $.ajax({
        type: 'post',
        url: '/get-country-profile',
        data: {
            _token: _token,
            index_id: index_id,
            sub_index_id: sub_index_id,
            indicator_id: indicator_id,
            year: year,
            iso : iso
        },
        success: function (response) {
            if(response.html){
                if (response.responseCode == 1){
                    $('.sdg-tab-navber a[href="#tab_rankings"]').removeClass("active")
                    $('.sdg-tab-navber a[href="#tab_countryProfile"]').tab('show');
                    $('#tab_countryProfile').html(response.html)
                }

                $('#ajaxLoader').hide();
                $('html, body').animate({
                    scrollTop: $("#cp-container").offset().top
                }, 500);
            }else{
                $('#ajaxLoader').hide();
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'No Data Found!'
                })
            }
        },
        error: function (xhr) {
        }
    });
}

function cpIndOnClick(iso, index_id, sub_index_id, sub_index_name, indicator_id, indicator_name){
    if(localStorage.getItem("cpToggleOpenFlag") == 0){
        $("#countryProfileSidebar").toggleClass('openIndex');
        localStorage.setItem("cpToggleOpenFlag", '1');
    }

    $('#ajaxLoader').css('display', 'block');

    let year = $('#year').val() ? $('#year').val() : 0;

    $.ajax({
        url: '/get-country-info-by-iso',
        type: 'post',
        data: {
            _token: _token,
            iso: iso,
            index_id: index_id,
            sub_index_id: sub_index_id,
            indicator_id: indicator_id,
            year: year
        },
        success: function (response) {
            if (response.responseCode == 1) {
                $('#cp-sub-index-title').html(sub_index_name + " · INDICATOR");
                $('#cp-ind-title').html(indicator_name);
                $('#cp-score-value-label').html(response.last_score_rank ? response.last_score_rank.score_value_flag + ":" : "Score:");
                $('#cp-score-value').html(response.last_score_rank ? response.last_score_rank.score_value : "-");
                $('#cp-rank').html(response.last_score_rank ? response.last_score_rank.country_rank : "-");

                $('#cp-scoreChart').empty();

                if(response.score_data != ''){
                    $('#cp-scoreChart').css('height', '250px');
                    trendChart(response.score_data);
                }else{
                    $('#cp-scoreChart').css('height', '80px');
                    $('#cp-scoreChart').html('<div class="gi-alert-box" role="alert"><h5 class="gi-alert-text"><i class="fa fa-info-circle" aria-hidden="true"></i> No Trend Data</h5></div>')
                }

            }

            $('#ajaxLoader').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
};

function commonFilterApply(is_reset = ""){
    $('#ajaxLoader').css('display', 'block');
    let active_tab = $('.sdg-tab-link.active').text();
    let iso = $('#country_iso').val() ? $('#country_iso').val() : "0";

    if(active_tab == "Interactive Map"){
        if(iso == "0"){
            iso = localStorage.getItem("mapIso");
        }

        if(iso){
            generateMap(iso);
            mapOnClick(iso);
        }else{
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Select a county on the map!'
            });
            $('#ajaxLoader').hide()
            return false;
        }
    }

    if(active_tab == "Rankings"){
        let regionId = $('#region_id').val() ? $('#region_id').val() : 0;
        let subRegionId = $('#sub_region_id').val() ? $('#sub_region_id').val() : 0;
        let countryGroupId = $('#country_group_id').val() ? $('#country_group_id').val() : 0;
        let page = "rank";
        loadRegionWiseCountryList(regionId, subRegionId, countryGroupId, page)
    }

    if(active_tab == "Data Explorer"){
        $('#ajaxLoader').hide();
        let country_name = $("#country_iso option:selected").text();

        if(iso){
            isoArray.push(iso)
        }

        if (isoArray.length == 0){
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Select a county on the list!'
            });
        }else{
            $.each(isoArray, function(index, item) {
                if(is_reset){
                    remove_line_from_chart(item);
                }
                get_line_chart_data(item, country_name)
            });
        }

    }

    if(active_tab == "Country Profile"){
        let country_iso = $('#country_iso').val() ? $('#country_iso').val() : 0;
        if(country_iso.length) {
            loadCountryProfile(country_iso)
        }else{
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Please select a country!'
            })
            $('#ajaxLoader').hide();
        }
    }
}

function clearFilter(is_reset = ""){
    $("#index_id").val(1);
    $("#sub_index_id").val("");
    $("#indicator_id").val("");
    $("#year").val("");
    $("#country_iso").val("");

    if(is_reset){
        commonFilterApply(is_reset);
    }
}
