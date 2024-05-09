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
                    <form action="addvoterInfo" method="post" enctype="multipart/form-data" >
                            @csrf
                        <div class="card-body">
                            <div class="form-group">
                                <label for="si">SI</label>
                                <input type="text" class="form-control" id="si" placeholder="0">
                            </div>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <label for="father_or_husband">Father/Husband Name</label>
                                <input type="text" class="form-control" id="father_or_husband" placeholder="Father/Husband Name">
                            </div>
                            <div class="form-group">
                                <label for="birth_date">Birth Date</label>
                                <input type="date" class="form-control" id="birth_date">
                            </div>

                            <div class="form-group">
                                <label for="birth_date">Birth Date</label>
                                <input type="file" name="file" class="form-control" id="birth_date">
                            </div>

                            <div class="form-group">
                                <label for="division">Division</label>
                                <select class="form-control" id="division">
                                    <option value="">Select Division</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Comilla">Comilla</option>
                                    <option value="Tangail">Tangail</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Gazipur">Gazipur</option>
                                    <option value="Barishal">Barishal</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Sirajganj">Sirajganj</option>
                                    <option value="Chittagong">Chittagong</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="district">District</label>
                                <select class="form-control" id="district">
                                    <option value="">Select District</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="upazila">Upazila</label>
                                <select class="form-control" id="union">
                                    <option value="">Select Upazila</option>
                                    <option value="Upazila A">Upazila A</option>
                                    <option value="Upazila B">Upazila B</option>
                                    <option value="Upazila C">Upazila C</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="union">Union</label>
                                <select class="form-control" id="union">
                                    <option value="">Select Union</option>
                                    <option value="Union A">Union A</option>
                                    <option value="Union B">Union B</option>
                                    <option value="Union C">Union C</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="election_area">Election Area</label>
                                <input type="text" class="form-control" id="election_area" placeholder="Election Area">
                            </div>
                        </div>

                        <div class="card-footer">
                            <button onclick="OnSubmit()" id="save-btn" class="btn text-white" style="background-image: linear-gradient(to top, rgb(0, 34, 141), rgb(37, 93, 157))">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</section>
<!-- PROFILE FORM END ========================= -->




<script>
    async function onSubmit() {
        const si = document.getElementById('si').value;
        const name = document.getElementById('name').value;
        const fatherOrHusband = document.getElementById('father_or_husband').value;
        const birthDate = document.getElementById('birth_date').value;
        const division = document.getElementById('division').value;
        const district = document.getElementById('district').value;
        const union = document.getElementById('union').value;
        const electionArea = document.getElementById('election_area').value;

        if (!si || !name || !fatherOrHusband || !birthDate || !division || !district || !union || !electionArea) {
            alert('Please fill out all fields');
            return;
        }

        const formData = {
            si: si,
            name: name,
            fathers_or_husband: fatherOrHusband,
            birth_date: birthDate,
            division: division,
            district: district,
            union: union,
            election_area: electionArea
        };

        try {
            const response = await axios.post('/save-voter-info', formData);
            console.log(response.data); // Log the response for debugging

            if (response.status === 200 && response.data.status === 'success') {
                alert('Voter info saved successfully');
                clearForm();
            } else {
                alert('Failed to save voter info');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving voter info');
        }
    }

    function clearForm() {
        document.getElementById('si').value = '';
        document.getElementById('name').value = '';
        document.getElementById('father_or_husband').value = '';
        document.getElementById('birth_date').value = '';
        document.getElementById('division').value = '';
        document.getElementById('district').value = '';
        document.getElementById('union').value = '';
        document.getElementById('election_area').value = '';
    }
</script>
@endsection
