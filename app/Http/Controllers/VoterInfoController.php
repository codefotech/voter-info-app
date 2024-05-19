<?php

namespace App\Http\Controllers;

use App\Models\VoterInfo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mockery\Exception;
use Smalot\PdfParser\Parser;
use thiagoalessio\TesseractOCR\TesseractOCR;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\DataTables;


class VoterInfoController extends Controller
{

    public function voterlist()
    {
        return view('voterinfo.list');
    }

    public function voterlistdata()
    {
        $list = VoterInfo::orderBy('voter_info.id', 'asc')
        ->get(['voter_info.*']);
        

        return Datatables::of($list)
            ->addColumn('SL', function () {
                static $count = 1;
                return $count++;
            })
            ->editColumn('si', function ($list) {
                return $list->si;
            })
            ->editColumn('voter_no', function ($list) {
                return $list->voter_no;
            })
            
            ->editColumn('name', function ($list) {
                return $list->name;
            })
            ->editColumn('fathers_or_husband', function ($list) {
                return $list->fathers_or_husband;
            })
            ->editColumn('mother', function ($list) {
                return $list->mother;
            })
            ->editColumn('birth_date', function ($list) {
                return $list->birth_date;
            })
            ->editColumn('division', function ($list) {
                return $list->division;
            })
            ->editColumn('district', function ($list) {
                return $list->district;
            })
            ->editColumn('upazila', function ($list) {
                return $list->upazila;
            })
            ->editColumn('union', function ($list) {
                return $list->union;
            })
            ->editColumn('election_area', function ($list) {
                return $list->election_area;
            })

            ->addColumn('action', function ($list) {
             
                    // return '<a href="' . route('blog.edit', ['id' => Encryption::encodeId($list->id)]) . '" class="btn btn-sm btn-outline-dark"> <i class="fa fa-edit"></i> Edit</a><br>';
                    return '';
                
            })
            ->rawColumns(['image', 'title', 'status', 'action'])
            ->make(true);

    }



    public function addvoterInfo(){
        return view('voterinfo.create');
    }

  
    public function storeVoterInfo(Request $request)
    {
        
        return view('voterinfo.voterinfo');

    }

    public function uploadvoterinfo(Request $request){

        $data = $request->input('textdata');
        $union = $request->input('union');

        if (!empty($data)) {
        
            $patterns = array(
                '/(\d+)\.\s*নাম:/u',
                '/ভোটার নং: (.*?)\s/',        
                '/নাম: (.*?)(?=ভোটার নং:)/su',          
                '/মাতা:(.*?)(?=পেশা:)/su',
                '/পিতা: (.*?)\n/',
                '/(?<=ঠিকানা:)([^০১২৩৪৫৬৭৮৯]+)/u', 
                '/তারিখ:(.*?)\n/', 
            );

             

            // $matches = array();
            foreach ($patterns as $pattern) {
                preg_match_all($pattern, $data, $match);
                $matches[] = isset($match[1]) ? $match[1] : '';
            }

            // dd($matches);
            $i = 0;
            DB::beginTransaction();
            foreach ($matches[1] as $match)
            {
                $voterInfo = new VoterInfo();
                $voterInfo->voter_no = $match;
                $voterInfo->si = $matches[0][$i];
                $voterInfo->name = $matches[2][$i];
                $voterInfo->mother = $matches[3][$i];
                if ($matches && $matches[4])
               {
                $voterInfo->fathers_or_husband = isset($matches[4][$i]) ? $matches[4][$i] : '';
               } 

                $voterInfo->birth_date = isset($matches[6][$i]) ? $matches[6][$i] : '';

                $address = isset($matches[5][$i]) ? explode(',', $matches[5][$i]) : '';

                if ($address)
                {
                    $voterInfo->election_area = isset($address[0]) ? $address[0] : '';
                    $voterInfo->upazila = isset($address[2]) ? $address[2] : '';
                    $voterInfo->district = isset($address[3]) ? $address[3] : '';

                }
                $voterInfo->union = isset($union) ? $union : '';

                $voterInfo->save();
                $i = $i+1;

            }
            DB::commit();
            return view('voterinfo.list');
        }
        elseif ($request->hasFile('file')) {
            // $file = $request->file('file')->getPathname();
            // $parser = new Parser();
            // $pdf = $parser->parseFile($file);
            // $text = $pdf->getText();

            // $text = mb_convert_encoding($text, 'UTF-8', 'auto');
            // $text = str_replace("\x00?ভাটার এলাকার নাম:", '', $text);

            // $patterns = array(
            //     '/(\d+)\.\s*নাম:/u',
            //     '/\x00?ভাটার নং: (.*?)\n/',    
            //     '/নাম: (.*?)(?=\x00\x3Fভাটার নং:)/su',          
            //     '/মাতা: (.*?)\n/',
            //     '/িপতা: (.*?)\n/',
            //     '/(?<=িঠকানা:)([^০১২৩৪৫৬৭৮৯]+)/u', 
            //     '/জ\x01% তািরখ:(.*?)\n/', 
            // );
            
            // // Extracting information using regular expressions
            // $matches = array();
            // foreach ($patterns as $pattern) {
            //     preg_match_all($pattern, $text, $match);
            //     $matches[] = isset($match[1]) ? $match[1] : '';
            // }




            // $i = 0;
            // DB::beginTransaction();
            // foreach ($matches[1] as $match)
            // {
            //     $voterInfo = new VoterInfo();
            //     $voterInfo->voter_no = $match;
            //     $voterInfo->si = $matches[0][$i];
            //     $voterInfo->name = $matches[2][$i];
            //     $voterInfo->mother = $matches[3][$i];
            //     $voterInfo->fathers_or_husband = $matches[4][$i];
            //     $voterInfo->birth_date = $matches[6][$i];

            //     $address = explode(',', $matches[5][$i]);

            //     $voterInfo->election_area = $address[0];
            //     $voterInfo->union = $address[1];
            //     $voterInfo->upazila = $address[2];
            //     $voterInfo->district = $address[3];

            //     $voterInfo->save();
            //     $i = $i+1;

            // }
            // DB::commit();
            return view('voterinfo.upload');

        
        }
        return view('voterinfo.upload');
    }

}
