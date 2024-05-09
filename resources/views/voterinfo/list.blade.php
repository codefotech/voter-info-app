@extends('layout.dashboard')
@section('dashboard_content')
   <!-- PROFILE FORM START ======================= -->
<section class="content">
    <div class="container-fluid">
        <div class="row py-5 align-items-center justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header" style="background-image: linear-gradient(to bottom, rgb(12, 9, 88), rgb(0, 34, 141), rgb(37, 93, 157))">
                        <h3 class="card-title text-white">Add Voter Info</h3>
                    </div>
                    <div class="card-body">
                    <div class="table-responsive">
                        <table id="list" class="table table-striped table-bordered dt-responsive " cellspacing="0"
                               width="100%">
                            <thead>
                            <tr>
                                <th>SL</th>
                                <th>SI</th>
                                <th>Voter No</th>
                                <th>Name</th>
                                <th>Father/Husband</th>
                                <th>Mother</th>
                                <th>Birth Date</th>
                                <th>Division</th>
                                <th>District</th>
                                <th>Upazila</th>
                                <th>Union</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                        
                    </div>


                </div>
            </div>
        </div>
    </div>
</section>
<!-- PROFILE FORM END ========================= -->



<script src="{{ asset("assets/plugins/datatables/jquery.dataTables.min.js") }}"></script>
<script src="{{ asset("assets/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js") }}"></script>
<script src="{{ asset("assets/plugins/datatables-responsive/js/dataTables.responsive.min.js") }}"></script>
<script src="{{ asset("assets/plugins/datatables-responsive/js/responsive.bootstrap4.min.js") }}"></script>


<script>
        $(function() {
            $('#list').DataTable({
                processing: true,
                serverSide: true,
                ajax: {
                    url: '/voterlistdata',
                    method: 'get',
                    data: function(d) {
                        d._token = $('input[name="_token"]').val();
                    }
                },
                columns: [
                    {
                        data: 'SL',
                        name: 'SL'
                    },
                    {
                        data: 'si',
                        name: 'si'
                    },
                    {
                        data: 'voter_no',
                        name: 'voter_no'
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },

                    {
                        data: 'fathers_or_husband',
                        name: 'fathers_or_husband'
                    },
                    {
                        data: 'mother',
                        name: 'mother'
                    },
                    {
                        data: 'birth_date',
                        name: 'birth_date'
                    },
                    {
                        data: 'division',
                        name: 'division'
                    },
                    {
                        data: 'district',
                        name: 'district'
                    },
                    {
                        data: 'upazila',
                        name: 'upazila'
                    },
                    {
                        data: 'union',
                        name: 'union'
                    },
                    {
                        data: 'action',
                        name: 'action',
                        orderable: false,
                        searchable: false
                    }
                ],
                "aaSorting": []
            });
        });
    </script>
@endsection
