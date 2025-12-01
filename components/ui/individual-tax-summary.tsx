"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Individual tax collections - interactive line chart"

// ✅ Change your data shape: one entry per day, with 5 series
const chartData = [
  {"date": "2025-01-02", "gst": 9490, "cbdt": 61693, "telangana": 50476, "assam": 30529, "meghalaya": 44873}, 
{"date": "2025-01-03", "gst": 84785, "cbdt": 37246, "telangana": 18751, "assam": 3479, "meghalaya": 89325}, 
{"date": "2025-01-04", "gst": 71971, "cbdt": 97998, "telangana": 28866, "assam": 33841, "meghalaya": 7084}, 
{"date": "2025-01-05", "gst": 71651, "cbdt": 99945, "telangana": 42344, "assam": 82489, "meghalaya": 65791}, 
{"date": "2025-01-06", "gst": 18730, "cbdt": 31955, "telangana": 63708, "assam": 29209, "meghalaya": 72317}, 
{"date": "2025-01-07", "gst": 86546, "cbdt": 40238, "telangana": 32512, "assam": 13710, "meghalaya": 67828}, 
{"date": "2025-01-08", "gst": 9595, "cbdt": 77311, "telangana": 94374, "assam": 8637, "meghalaya": 32748}, 
{"date": "2025-01-09", "gst": 59444, "cbdt": 75364, "telangana": 65562, "assam": 30651, "meghalaya": 80248}, 
{"date": "2025-01-10", "gst": 9858, "cbdt": 58488, "telangana": 79557, "assam": 20833, "meghalaya": 58890}, 
{"date": "2025-01-11", "gst": 22242, "cbdt": 5749, "telangana": 73254, "assam": 8121, "meghalaya": 82787}, 
{"date": "2025-01-12", "gst": 37655, "cbdt": 58942, "telangana": 42304, "assam": 44820, "meghalaya": 64360}, 
{"date": "2025-01-13", "gst": 36421, "cbdt": 17036, "telangana": 1170, "assam": 58457, "meghalaya": 87442}, 
{"date": "2025-01-14", "gst": 29008, "cbdt": 80894, "telangana": 34275, "assam": 92253, "meghalaya": 93950}, 
{"date": "2025-01-15", "gst": 38750, "cbdt": 75638, "telangana": 63950, "assam": 70276, "meghalaya": 29533}, 
{"date": "2025-01-16", "gst": 6919, "cbdt": 64923, "telangana": 82194, "assam": 2871, "meghalaya": 69399}, 
{"date": "2025-01-17", "gst": 30225, "cbdt": 91562, "telangana": 82855, "assam": 83793, "meghalaya": 73824}, 
{"date": "2025-01-18", "gst": 18741, "cbdt": 89788, "telangana": 71040, "assam": 79463, "meghalaya": 50293}, 
{"date": "2025-01-19", "gst": 73485, "cbdt": 10816, "telangana": 82912, "assam": 44053, "meghalaya": 68066}, 
{"date": "2025-01-20", "gst": 63203, "cbdt": 59408, "telangana": 51877, "assam": 32765, "meghalaya": 53487}, 
{"date": "2025-01-21", "gst": 56455, "cbdt": 4873, "telangana": 44749, "assam": 51652, "meghalaya": 28461}, 
{"date": "2025-01-22", "gst": 31039, "cbdt": 34153, "telangana": 59659, "assam": 87247, "meghalaya": 96762}, 
{"date": "2025-01-23", "gst": 44732, "cbdt": 32747, "telangana": 99252, "assam": 64581, "meghalaya": 65250}, 
{"date": "2025-01-24", "gst": 71468, "cbdt": 70934, "telangana": 3687, "assam": 91340, "meghalaya": 18965}, 
{"date": "2025-01-25", "gst": 74540, "cbdt": 5476, "telangana": 7665, "assam": 3131, "meghalaya": 71984}, 
{"date": "2025-01-26", "gst": 95887, "cbdt": 86094, "telangana": 77938, "assam": 81857, "meghalaya": 48782}, 
{"date": "2025-01-27", "gst": 24512, "cbdt": 71196, "telangana": 37463, "assam": 21075, "meghalaya": 66449}, 
{"date": "2025-01-28", "gst": 87825, "cbdt": 61816, "telangana": 15736, "assam": 86567, "meghalaya": 76394}, 
{"date": "2025-01-29", "gst": 94281, "cbdt": 57538, "telangana": 4270, "assam": 33439, "meghalaya": 60073}, 
{"date": "2025-01-30", "gst": 37988, "cbdt": 72129, "telangana": 9954, "assam": 62029, "meghalaya": 62554}, 
{"date": "2025-01-31", "gst": 75282, "cbdt": 4384, "telangana": 39674, "assam": 12970, "meghalaya": 62046}, 
{"date": "2025-02-01", "gst": 8119, "cbdt": 76922, "telangana": 83461, "assam": 17018, "meghalaya": 33075}, 
{"date": "2025-02-02", "gst": 29871, "cbdt": 32671, "telangana": 49347, "assam": 98155, "meghalaya": 59530}, 
{"date": "2025-02-03", "gst": 33074, "cbdt": 35981, "telangana": 79699, "assam": 82830, "meghalaya": 36853}, 
{"date": "2025-02-04", "gst": 38081, "cbdt": 82130, "telangana": 15002, "assam": 22298, "meghalaya": 6441}, 
{"date": "2025-02-05", "gst": 81545, "cbdt": 86602, "telangana": 94802, "assam": 54865, "meghalaya": 65932}, 
{"date": "2025-02-06", "gst": 38836, "cbdt": 17355, "telangana": 68097, "assam": 74966, "meghalaya": 66482}, 
{"date": "2025-02-07", "gst": 17012, "cbdt": 28626, "telangana": 74662, "assam": 38444, "meghalaya": 83273}, 
{"date": "2025-02-08", "gst": 31071, "cbdt": 71551, "telangana": 8671, "assam": 28325, "meghalaya": 84798}, 
{"date": "2025-02-09", "gst": 29441, "cbdt": 18647, "telangana": 1270, "assam": 85485, "meghalaya": 90818}, 
{"date": "2025-02-10", "gst": 43084, "cbdt": 37184, "telangana": 54729, "assam": 84063, "meghalaya": 41037}, 
{"date": "2025-02-11", "gst": 80672, "cbdt": 92994, "telangana": 48965, "assam": 83341, "meghalaya": 10025}, 
{"date": "2025-02-12", "gst": 8348, "cbdt": 95145, "telangana": 2986, "assam": 46528, "meghalaya": 46871}, 
{"date": "2025-02-13", "gst": 56303, "cbdt": 49194, "telangana": 88377, "assam": 73918, "meghalaya": 29166}, 
{"date": "2025-02-14", "gst": 82098, "cbdt": 74923, "telangana": 74078, "assam": 30512, "meghalaya": 51642}, 
{"date": "2025-02-15", "gst": 62912, "cbdt": 65655, "telangana": 2271, "assam": 15649, "meghalaya": 13319}, 
{"date": "2025-02-16", "gst": 59020, "cbdt": 3935, "telangana": 57874, "assam": 57518, "meghalaya": 41326}, 
{"date": "2025-02-17", "gst": 52038, "cbdt": 61827, "telangana": 73742, "assam": 41617, "meghalaya": 87980}, 
{"date": "2025-02-18", "gst": 19513, "cbdt": 21284, "telangana": 8632, "assam": 94366, "meghalaya": 20261}, 
{"date": "2025-02-19", "gst": 84812, "cbdt": 72169, "telangana": 77679, "assam": 65888, "meghalaya": 24200}, 
{"date": "2025-02-20", "gst": 7156, "cbdt": 47282, "telangana": 9303, "assam": 97234, "meghalaya": 5804}, 
{"date": "2025-02-21", "gst": 80073, "cbdt": 87136, "telangana": 56840, "assam": 21184, "meghalaya": 86441}, 
{"date": "2025-02-22", "gst": 12351, "cbdt": 2300, "telangana": 68079, "assam": 31630, "meghalaya": 72032}, 
{"date": "2025-02-23", "gst": 85029, "cbdt": 15476, "telangana": 99790, "assam": 91685, "meghalaya": 57393}, 
{"date": "2025-02-24", "gst": 4121, "cbdt": 82910, "telangana": 44434, "assam": 59930, "meghalaya": 12670}, 
{"date": "2025-02-25", "gst": 79862, "cbdt": 48837, "telangana": 71171, "assam": 7815, "meghalaya": 40031}, 
{"date": "2025-02-26", "gst": 9251, "cbdt": 96521, "telangana": 62668, "assam": 30366, "meghalaya": 42037}, 
{"date": "2025-02-27", "gst": 34068, "cbdt": 16564, "telangana": 27826, "assam": 22300, "meghalaya": 48299}, 
{"date": "2025-02-28", "gst": 12013, "cbdt": 78910, "telangana": 27071, "assam": 20664, "meghalaya": 36417}, 
{"date": "2025-03-01", "gst": 84846, "cbdt": 23907, "telangana": 48651, "assam": 11217, "meghalaya": 37537}, 
{"date": "2025-03-02", "gst": 95898, "cbdt": 20042, "telangana": 73109, "assam": 40237, "meghalaya": 1198}, 
{"date": "2025-03-03", "gst": 77655, "cbdt": 54146, "telangana": 13019, "assam": 70687, "meghalaya": 34407}, 
{"date": "2025-03-04", "gst": 76316, "cbdt": 83356, "telangana": 37735, "assam": 40702, "meghalaya": 16662}, 
{"date": "2025-03-05", "gst": 10846, "cbdt": 80013, "telangana": 41037, "assam": 32566, "meghalaya": 66311}, 
{"date": "2025-03-06", "gst": 18961, "cbdt": 34242, "telangana": 65902, "assam": 18770, "meghalaya": 5371}, 
{"date": "2025-03-07", "gst": 34430, "cbdt": 70337, "telangana": 79953, "assam": 70136, "meghalaya": 94401}, 
{"date": "2025-03-08", "gst": 15841, "cbdt": 64101, "telangana": 70384, "assam": 43516, "meghalaya": 9145}, 
{"date": "2025-03-09", "gst": 1826, "cbdt": 76509, "telangana": 79978, "assam": 93092, "meghalaya": 9944}, 
{"date": "2025-03-10", "gst": 82894, "cbdt": 88056, "telangana": 89205, "assam": 70749, "meghalaya": 9252}, 
{"date": "2025-03-11", "gst": 29141, "cbdt": 54613, "telangana": 28606, "assam": 29196, "meghalaya": 3565}, 
{"date": "2025-03-12", "gst": 84725, "cbdt": 31235, "telangana": 97100, "assam": 62386, "meghalaya": 38325}, 
{"date": "2025-03-13", "gst": 25304, "cbdt": 25541, "telangana": 38196, "assam": 52152, "meghalaya": 29219}, 
{"date": "2025-03-14", "gst": 78762, "cbdt": 1389, "telangana": 15976, "assam": 55503, "meghalaya": 52150}, 
{"date": "2025-03-15", "gst": 76619, "cbdt": 41937, "telangana": 28596, "assam": 62410, "meghalaya": 70225}, 
{"date": "2025-03-16", "gst": 89478, "cbdt": 4347, "telangana": 88087, "assam": 26351, "meghalaya": 72198}, 
{"date": "2025-03-17", "gst": 22253, "cbdt": 56823, "telangana": 54652, "assam": 16157, "meghalaya": 36917}, 
{"date": "2025-03-18", "gst": 95507, "cbdt": 15578, "telangana": 85667, "assam": 23454, "meghalaya": 68020}, 
{"date": "2025-03-19", "gst": 42203, "cbdt": 31969, "telangana": 25582, "assam": 7150, "meghalaya": 1302}, 
{"date": "2025-03-20", "gst": 76359, "cbdt": 1491, "telangana": 90808, "assam": 55553, "meghalaya": 35054}, 
{"date": "2025-03-21", "gst": 80796, "cbdt": 44701, "telangana": 23569, "assam": 64232, "meghalaya": 85114}, 
{"date": "2025-03-22", "gst": 12193, "cbdt": 48051, "telangana": 25594, "assam": 70988, "meghalaya": 83021}, 
{"date": "2025-03-23", "gst": 19348, "cbdt": 12727, "telangana": 67481, "assam": 45488, "meghalaya": 40010}, 
{"date": "2025-03-24", "gst": 47955, "cbdt": 26884, "telangana": 79580, "assam": 81926, "meghalaya": 6006}, 
{"date": "2025-03-25", "gst": 48833, "cbdt": 64366, "telangana": 86635, "assam": 9093, "meghalaya": 70828}, 
{"date": "2025-03-26", "gst": 44442, "cbdt": 23506, "telangana": 34359, "assam": 96716, "meghalaya": 98943}, 
{"date": "2025-03-27", "gst": 64786, "cbdt": 13974, "telangana": 74097, "assam": 99805, "meghalaya": 3832}, 
{"date": "2025-03-28", "gst": 2396, "cbdt": 1154, "telangana": 9416, "assam": 1558, "meghalaya": 61211}, 
{"date": "2025-03-29", "gst": 69411, "cbdt": 85333, "telangana": 49479, "assam": 69910, "meghalaya": 78276}, 
{"date": "2025-03-30", "gst": 34782, "cbdt": 43873, "telangana": 7724, "assam": 94278, "meghalaya": 76118}, 
{"date": "2025-03-31", "gst": 75983, "cbdt": 62262, "telangana": 7989, "assam": 24300, "meghalaya": 55864}, 
{"date": "2025-04-01", "gst": 73726, "cbdt": 61640, "telangana": 47862, "assam": 88201, "meghalaya": 83729}, 
{"date": "2025-04-02", "gst": 51778, "cbdt": 98301, "telangana": 53258, "assam": 25117, "meghalaya": 30169}, 
{"date": "2025-04-03", "gst": 84050, "cbdt": 71152, "telangana": 92404, "assam": 29706, "meghalaya": 44563}, 
{"date": "2025-04-04", "gst": 20572, "cbdt": 1844, "telangana": 50286, "assam": 16807, "meghalaya": 47507}, 
{"date": "2025-04-05", "gst": 77260, "cbdt": 6889, "telangana": 91265, "assam": 79311, "meghalaya": 76578}, 
{"date": "2025-04-06", "gst": 11294, "cbdt": 47865, "telangana": 79025, "assam": 37052, "meghalaya": 24320}, 
{"date": "2025-04-07", "gst": 92150, "cbdt": 81207, "telangana": 11792, "assam": 69402, "meghalaya": 87331}, 
{"date": "2025-04-08", "gst": 26237, "cbdt": 70881, "telangana": 41879, "assam": 66915, "meghalaya": 83556}, 
{"date": "2025-04-09", "gst": 65492, "cbdt": 89736, "telangana": 62936, "assam": 60880, "meghalaya": 29211}, 
{"date": "2025-04-10", "gst": 40155, "cbdt": 15993, "telangana": 21048, "assam": 24405, "meghalaya": 21776}, 
{"date": "2025-04-11", "gst": 3878, "cbdt": 88752, "telangana": 59683, "assam": 24963, "meghalaya": 71810}, 
{"date": "2025-04-12", "gst": 2255, "cbdt": 82478, "telangana": 30284, "assam": 98804, "meghalaya": 57777}, 
{"date": "2025-04-13", "gst": 35422, "cbdt": 82548, "telangana": 39357, "assam": 70573, "meghalaya": 90243}, 
{"date": "2025-04-14", "gst": 76505, "cbdt": 50401, "telangana": 92716, "assam": 75294, "meghalaya": 27128}, 
{"date": "2025-04-15", "gst": 59465, "cbdt": 24217, "telangana": 64840, "assam": 43400, "meghalaya": 53761}, 
{"date": "2025-04-16", "gst": 2814, "cbdt": 19705, "telangana": 94915, "assam": 12259, "meghalaya": 79075}, 
{"date": "2025-04-17", "gst": 21302, "cbdt": 68156, "telangana": 48209, "assam": 7164, "meghalaya": 16288}, 
{"date": "2025-04-18", "gst": 14739, "cbdt": 34814, "telangana": 46099, "assam": 30126, "meghalaya": 51093}, 
{"date": "2025-04-19", "gst": 17868, "cbdt": 22033, "telangana": 16274, "assam": 2833, "meghalaya": 31631}, 
{"date": "2025-04-20", "gst": 8287, "cbdt": 69128, "telangana": 98773, "assam": 98320, "meghalaya": 5666}, 
{"date": "2025-04-21", "gst": 48317, "cbdt": 81802, "telangana": 99529, "assam": 29069, "meghalaya": 13305}, 
{"date": "2025-04-22", "gst": 23945, "cbdt": 43634, "telangana": 48527, "assam": 65592, "meghalaya": 95455}, 
{"date": "2025-04-23", "gst": 78164, "cbdt": 69257, "telangana": 70460, "assam": 6836, "meghalaya": 95734}, 
{"date": "2025-04-24", "gst": 52792, "cbdt": 21294, "telangana": 66576, "assam": 25166, "meghalaya": 27676}, 
{"date": "2025-04-25", "gst": 51084, "cbdt": 81797, "telangana": 80669, "assam": 12592, "meghalaya": 57268}, 
{"date": "2025-04-26", "gst": 14308, "cbdt": 22284, "telangana": 37592, "assam": 20206, "meghalaya": 69793}, 
{"date": "2025-04-27", "gst": 89766, "cbdt": 15426, "telangana": 54233, "assam": 62172, "meghalaya": 8732}, 
{"date": "2025-04-28", "gst": 3970, "cbdt": 62523, "telangana": 91646, "assam": 26010, "meghalaya": 80322}, 
{"date": "2025-04-29", "gst": 66567, "cbdt": 77798, "telangana": 99277, "assam": 77537, "meghalaya": 85738}, 
{"date": "2025-04-30", "gst": 98595, "cbdt": 21566, "telangana": 48378, "assam": 8084, "meghalaya": 20336}, 
{"date": "2025-05-01", "gst": 23776, "cbdt": 15425, "telangana": 68293, "assam": 10655, "meghalaya": 22458}, 
{"date": "2025-05-02", "gst": 79469, "cbdt": 10832, "telangana": 16682, "assam": 35960, "meghalaya": 8625}, 
{"date": "2025-05-03", "gst": 31592, "cbdt": 6613, "telangana": 51115, "assam": 99927, "meghalaya": 15025}, 
{"date": "2025-05-04", "gst": 95076, "cbdt": 55702, "telangana": 85121, "assam": 12069, "meghalaya": 97414}, 
{"date": "2025-05-05", "gst": 56125, "cbdt": 25313, "telangana": 64840, "assam": 86439, "meghalaya": 31408}, 
{"date": "2025-05-06", "gst": 16249, "cbdt": 88667, "telangana": 91064, "assam": 68187, "meghalaya": 78147}, 
{"date": "2025-05-07", "gst": 21855, "cbdt": 84542, "telangana": 51436, "assam": 76108, "meghalaya": 46356}, 
{"date": "2025-05-08", "gst": 93751, "cbdt": 89001, "telangana": 41409, "assam": 13867, "meghalaya": 8757}, 
{"date": "2025-05-09", "gst": 61031, "cbdt": 97624, "telangana": 73656, "assam": 98502, "meghalaya": 88936}, 
{"date": "2025-05-10", "gst": 99775, "cbdt": 49286, "telangana": 13641, "assam": 99307, "meghalaya": 2181}, 
{"date": "2025-05-11", "gst": 11335, "cbdt": 81814, "telangana": 25940, "assam": 18047, "meghalaya": 90840}, 
{"date": "2025-05-12", "gst": 91891, "cbdt": 19790, "telangana": 78948, "assam": 78258, "meghalaya": 96556}, 
{"date": "2025-05-13", "gst": 87688, "cbdt": 82444, "telangana": 91351, "assam": 85185, "meghalaya": 85673}, 
{"date": "2025-05-14", "gst": 82678, "cbdt": 86818, "telangana": 28588, "assam": 2480, "meghalaya": 67771}, 
{"date": "2025-05-15", "gst": 52643, "cbdt": 28059, "telangana": 96532, "assam": 43829, "meghalaya": 7703}, 
{"date": "2025-05-16", "gst": 34106, "cbdt": 37692, "telangana": 56617, "assam": 55621, "meghalaya": 3524}, 
{"date": "2025-05-17", "gst": 69092, "cbdt": 93258, "telangana": 19327, "assam": 65106, "meghalaya": 91903}, 
{"date": "2025-05-18", "gst": 90015, "cbdt": 20486, "telangana": 87306, "assam": 36180, "meghalaya": 51276}, 
{"date": "2025-05-19", "gst": 70521, "cbdt": 8697, "telangana": 38939, "assam": 14930, "meghalaya": 96526}, 
{"date": "2025-05-20", "gst": 14244, "cbdt": 97493, "telangana": 50252, "assam": 81095, "meghalaya": 50252}, 
{"date": "2025-05-21", "gst": 84744, "cbdt": 47044, "telangana": 68321, "assam": 82964, "meghalaya": 40210}, 
{"date": "2025-05-22", "gst": 29668, "cbdt": 50661, "telangana": 12577, "assam": 40240, "meghalaya": 78515}, 
{"date": "2025-05-23", "gst": 79753, "cbdt": 94655, "telangana": 61278, "assam": 31356, "meghalaya": 2691}, 
{"date": "2025-05-24", "gst": 38571, "cbdt": 19146, "telangana": 18449, "assam": 85036, "meghalaya": 65475}, 
{"date": "2025-05-25", "gst": 90106, "cbdt": 77043, "telangana": 81867, "assam": 56132, "meghalaya": 34868}, 
{"date": "2025-05-26", "gst": 1856, "cbdt": 30803, "telangana": 90976, "assam": 38658, "meghalaya": 22258}, 
{"date": "2025-05-27", "gst": 39528, "cbdt": 17178, "telangana": 70212, "assam": 45318, "meghalaya": 53158}, 
{"date": "2025-05-28", "gst": 83411, "cbdt": 44415, "telangana": 99303, "assam": 61485, "meghalaya": 17909}, 
{"date": "2025-05-29", "gst": 98032, "cbdt": 37224, "telangana": 66645, "assam": 62455, "meghalaya": 81096}, 
{"date": "2025-05-30", "gst": 55537, "cbdt": 93393, "telangana": 22623, "assam": 28436, "meghalaya": 15132}, 
{"date": "2025-05-31", "gst": 57660, "cbdt": 30011, "telangana": 95077, "assam": 77638, "meghalaya": 15553}, 
{"date": "2025-06-01", "gst": 56773, "cbdt": 83944, "telangana": 46054, "assam": 46187, "meghalaya": 37647}, 
{"date": "2025-06-02", "gst": 29411, "cbdt": 70597, "telangana": 38071, "assam": 87038, "meghalaya": 11728}, 
{"date": "2025-06-03", "gst": 71483, "cbdt": 17845, "telangana": 56976, "assam": 39558, "meghalaya": 87334}, 
{"date": "2025-06-04", "gst": 58648, "cbdt": 58843, "telangana": 35005, "assam": 89149, "meghalaya": 45880}, 
{"date": "2025-06-05", "gst": 77488, "cbdt": 9178, "telangana": 66426, "assam": 62238, "meghalaya": 68747}, 
{"date": "2025-06-06", "gst": 16676, "cbdt": 53054, "telangana": 41308, "assam": 72252, "meghalaya": 11476}, 
{"date": "2025-06-07", "gst": 61311, "cbdt": 51322, "telangana": 59026, "assam": 97958, "meghalaya": 80070}, 
{"date": "2025-06-08", "gst": 90910, "cbdt": 15568, "telangana": 34106, "assam": 20289, "meghalaya": 58505}, 
{"date": "2025-06-09", "gst": 19417, "cbdt": 90033, "telangana": 68053, "assam": 82541, "meghalaya": 92032}, 
{"date": "2025-06-10", "gst": 93237, "cbdt": 5239, "telangana": 83063, "assam": 98836, "meghalaya": 18354}, 
{"date": "2025-06-11", "gst": 80206, "cbdt": 36497, "telangana": 64026, "assam": 20938, "meghalaya": 56752}, 
{"date": "2025-06-12", "gst": 60822, "cbdt": 40508, "telangana": 51274, "assam": 69353, "meghalaya": 58972}, 
{"date": "2025-06-13", "gst": 30750, "cbdt": 79093, "telangana": 20088, "assam": 24236, "meghalaya": 99447}, 
{"date": "2025-06-14", "gst": 8268, "cbdt": 88001, "telangana": 74834, "assam": 9815, "meghalaya": 4023}, 
{"date": "2025-06-15", "gst": 30430, "cbdt": 40446, "telangana": 95215, "assam": 88823, "meghalaya": 21986}, 
{"date": "2025-06-16", "gst": 76858, "cbdt": 16670, "telangana": 4314, "assam": 72335, "meghalaya": 20936}, 
{"date": "2025-06-17", "gst": 23158, "cbdt": 86660, "telangana": 71175, "assam": 27477, "meghalaya": 42818}, 
{"date": "2025-06-18", "gst": 93968, "cbdt": 77949, "telangana": 14768, "assam": 96078, "meghalaya": 5746}, 
{"date": "2025-06-19", "gst": 36833, "cbdt": 71785, "telangana": 30208, "assam": 79605, "meghalaya": 4913}, 
{"date": "2025-06-20", "gst": 34147, "cbdt": 3305, "telangana": 8426, "assam": 86317, "meghalaya": 1611}, 
{"date": "2025-06-21", "gst": 66404, "cbdt": 24083, "telangana": 32571, "assam": 25570, "meghalaya": 55654}, 
{"date": "2025-06-22", "gst": 36495, "cbdt": 38320, "telangana": 53233, "assam": 98084, "meghalaya": 84919}, 
{"date": "2025-06-23", "gst": 29516, "cbdt": 88422, "telangana": 32059, "assam": 17469, "meghalaya": 5280}, 
{"date": "2025-06-24", "gst": 14494, "cbdt": 28457, "telangana": 36018, "assam": 57731, "meghalaya": 21645}, 
{"date": "2025-06-25", "gst": 3228, "cbdt": 33392, "telangana": 6673, "assam": 30074, "meghalaya": 35717}, 
{"date": "2025-06-26", "gst": 85310, "cbdt": 64488, "telangana": 95500, "assam": 24088, "meghalaya": 7016}, 
{"date": "2025-06-27", "gst": 27940, "cbdt": 93950, "telangana": 72919, "assam": 91404, "meghalaya": 11428}, 
{"date": "2025-06-28", "gst": 75921, "cbdt": 48353, "telangana": 48559, "assam": 61685, "meghalaya": 56620}, 
{"date": "2025-06-29", "gst": 75394, "cbdt": 8603, "telangana": 67990, "assam": 12662, "meghalaya": 29273}, 
{"date": "2025-06-30", "gst": 96595, "cbdt": 66224, "telangana": 11699, "assam": 44621, "meghalaya": 61421}, 
{"date": "2025-07-01", "gst": 30325, "cbdt": 17190, "telangana": 80792, "assam": 61628, "meghalaya": 75872}, 
{"date": "2025-07-02", "gst": 1988, "cbdt": 95484, "telangana": 88033, "assam": 75242, "meghalaya": 38765}, 
{"date": "2025-07-03", "gst": 70552, "cbdt": 46920, "telangana": 23374, "assam": 26716, "meghalaya": 44812}, 
{"date": "2025-07-04", "gst": 6282, "cbdt": 63842, "telangana": 75652, "assam": 7367, "meghalaya": 2916}, 
{"date": "2025-07-05", "gst": 42278, "cbdt": 81957, "telangana": 86898, "assam": 89272, "meghalaya": 82430}, 
{"date": "2025-07-06", "gst": 91372, "cbdt": 63337, "telangana": 68598, "assam": 29635, "meghalaya": 13984}, 
{"date": "2025-07-07", "gst": 13409, "cbdt": 22341, "telangana": 44223, "assam": 55626, "meghalaya": 88266}, 
{"date": "2025-07-08", "gst": 9008, "cbdt": 9278, "telangana": 16650, "assam": 29107, "meghalaya": 14600}, 
{"date": "2025-07-09", "gst": 46975, "cbdt": 92418, "telangana": 62131, "assam": 82745, "meghalaya": 90115}, 
{"date": "2025-07-10", "gst": 60887, "cbdt": 82604, "telangana": 23293, "assam": 76085, "meghalaya": 77426}, 
{"date": "2025-07-11", "gst": 91991, "cbdt": 5614, "telangana": 47708, "assam": 36110, "meghalaya": 52990}, 
{"date": "2025-07-12", "gst": 7559, "cbdt": 64687, "telangana": 28373, "assam": 68517, "meghalaya": 65572}, 
{"date": "2025-07-13", "gst": 1126, "cbdt": 39553, "telangana": 96725, "assam": 17610, "meghalaya": 15183}, 
{"date": "2025-07-14", "gst": 36985, "cbdt": 8129, "telangana": 88164, "assam": 49873, "meghalaya": 4820}, 
{"date": "2025-07-15", "gst": 25274, "cbdt": 95436, "telangana": 4678, "assam": 90842, "meghalaya": 13485}, 
{"date": "2025-07-16", "gst": 51379, "cbdt": 59201, "telangana": 85905, "assam": 10966, "meghalaya": 22157}, 
{"date": "2025-07-17", "gst": 7910, "cbdt": 8633, "telangana": 57794, "assam": 35640, "meghalaya": 5960}, 
{"date": "2025-07-18", "gst": 10804, "cbdt": 57166, "telangana": 92407, "assam": 64205, "meghalaya": 86609}, 
{"date": "2025-07-19", "gst": 61387, "cbdt": 70847, "telangana": 43446, "assam": 74063, "meghalaya": 42227}, 
{"date": "2025-07-20", "gst": 92205, "cbdt": 11061, "telangana": 14277, "assam": 54785, "meghalaya": 87829}, 
{"date": "2025-07-21", "gst": 30290, "cbdt": 90253, "telangana": 15943, "assam": 64082, "meghalaya": 61764}, 
{"date": "2025-07-22", "gst": 69865, "cbdt": 32034, "telangana": 81526, "assam": 64005, "meghalaya": 22062}, 
{"date": "2025-07-23", "gst": 53816, "cbdt": 67582, "telangana": 64630, "assam": 27207, "meghalaya": 66864}, 
{"date": "2025-07-24", "gst": 27619, "cbdt": 43945, "telangana": 9472, "assam": 80475, "meghalaya": 59045}, 
{"date": "2025-07-25", "gst": 26318, "cbdt": 76823, "telangana": 40443, "assam": 73104, "meghalaya": 49654}, 
{"date": "2025-07-26", "gst": 92280, "cbdt": 51147, "telangana": 31907, "assam": 63690, "meghalaya": 68807}, 
{"date": "2025-07-27", "gst": 45169, "cbdt": 7295, "telangana": 19619, "assam": 53707, "meghalaya": 52072}, 
{"date": "2025-07-28", "gst": 29867, "cbdt": 12226, "telangana": 19080, "assam": 67588, "meghalaya": 23612}, 
{"date": "2025-07-29", "gst": 45055, "cbdt": 89222, "telangana": 94742, "assam": 60813, "meghalaya": 58838}, 
{"date": "2025-07-30", "gst": 20721, "cbdt": 56359, "telangana": 92672, "assam": 73865, "meghalaya": 5889}, 
{"date": "2025-07-31", "gst": 32257, "cbdt": 9409, "telangana": 74137, "assam": 47037, "meghalaya": 15613}, 
{"date": "2025-08-01", "gst": 95163, "cbdt": 28542, "telangana": 84118, "assam": 67542, "meghalaya": 68152}, 
{"date": "2025-08-02", "gst": 5828, "cbdt": 43475, "telangana": 73239, "assam": 78613, "meghalaya": 42555}, 
{"date": "2025-08-03", "gst": 45681, "cbdt": 56429, "telangana": 52141, "assam": 56238, "meghalaya": 33337}, 
{"date": "2025-08-04", "gst": 7702, "cbdt": 60121, "telangana": 78599, "assam": 28658, "meghalaya": 25967}, 
{"date": "2025-08-05", "gst": 51416, "cbdt": 37262, "telangana": 16287, "assam": 1106, "meghalaya": 49205}, 
{"date": "2025-08-06", "gst": 35567, "cbdt": 66658, "telangana": 90377, "assam": 3504, "meghalaya": 63052}, 
{"date": "2025-08-07", "gst": 23253, "cbdt": 88477, "telangana": 24198, "assam": 32568, "meghalaya": 23220}, 
{"date": "2025-08-08", "gst": 32215, "cbdt": 81831, "telangana": 35096, "assam": 89782, "meghalaya": 64527}, 
{"date": "2025-08-09", "gst": 24042, "cbdt": 6515, "telangana": 85061, "assam": 45093, "meghalaya": 6669}, 
{"date": "2025-08-10", "gst": 6826, "cbdt": 14445, "telangana": 54377, "assam": 4444, "meghalaya": 69997}, 
{"date": "2025-08-11", "gst": 35009, "cbdt": 80637, "telangana": 47431, "assam": 98702, "meghalaya": 30376}, 
{"date": "2025-08-12", "gst": 56030, "cbdt": 35078, "telangana": 19077, "assam": 51106, "meghalaya": 82470}, 
{"date": "2025-08-13", "gst": 14563, "cbdt": 16488, "telangana": 74693, "assam": 64330, "meghalaya": 74837}, 
{"date": "2025-08-14", "gst": 23076, "cbdt": 76568, "telangana": 75991, "assam": 57077, "meghalaya": 56146}, 
{"date": "2025-08-15", "gst": 65108, "cbdt": 42660, "telangana": 10501, "assam": 94453, "meghalaya": 33947}, 
{"date": "2025-08-16", "gst": 24011, "cbdt": 92517, "telangana": 68870, "assam": 33268, "meghalaya": 60568}, 
{"date": "2025-08-17", "gst": 68225, "cbdt": 16850, "telangana": 43216, "assam": 78627, "meghalaya": 69419}, 
{"date": "2025-08-18", "gst": 67579, "cbdt": 46190, "telangana": 66599, "assam": 30658, "meghalaya": 38366}, 
{"date": "2025-08-19", "gst": 59800, "cbdt": 5634, "telangana": 17659, "assam": 92566, "meghalaya": 33455}, 
{"date": "2025-08-20", "gst": 56118, "cbdt": 2781, "telangana": 65638, "assam": 62550, "meghalaya": 38470}, 
{"date": "2025-08-21", "gst": 27751, "cbdt": 15300, "telangana": 81746, "assam": 4097, "meghalaya": 79441}, 
{"date": "2025-08-22", "gst": 60664, "cbdt": 9295, "telangana": 70827, "assam": 62632, "meghalaya": 43392}, 
{"date": "2025-08-23", "gst": 50439, "cbdt": 79227, "telangana": 69322, "assam": 80654, "meghalaya": 62332}, 
{"date": "2025-08-24", "gst": 75887, "cbdt": 82373, "telangana": 42850, "assam": 52159, "meghalaya": 14036}, 
{"date": "2025-08-25", "gst": 54519, "cbdt": 95104, "telangana": 48137, "assam": 47368, "meghalaya": 18008}, 
{"date": "2025-08-26", "gst": 4561, "cbdt": 48134, "telangana": 88081, "assam": 6991, "meghalaya": 72758}, 
{"date": "2025-08-27", "gst": 54838, "cbdt": 49058, "telangana": 49714, "assam": 63630, "meghalaya": 52808}, 
{"date": "2025-08-28", "gst": 68880, "cbdt": 68770, "telangana": 63163, "assam": 84058, "meghalaya": 87706}, 
{"date": "2025-08-29", "gst": 34655, "cbdt": 52833, "telangana": 22087, "assam": 12217, "meghalaya": 35263}, 
{"date": "2025-08-30", "gst": 16773, "cbdt": 21868, "telangana": 95557, "assam": 66075, "meghalaya": 10290}, 
{"date": "2025-08-31", "gst": 1319, "cbdt": 58437, "telangana": 67443, "assam": 10481, "meghalaya": 1310}, 
{"date": "2025-09-01", "gst": 45842, "cbdt": 17696, "telangana": 53588, "assam": 10454, "meghalaya": 95565}, 
{"date": "2025-09-02", "gst": 12575, "cbdt": 21304, "telangana": 72500, "assam": 2284, "meghalaya": 2956}, 
{"date": "2025-09-03", "gst": 38020, "cbdt": 95673, "telangana": 19710, "assam": 20329, "meghalaya": 93218}, 
{"date": "2025-09-04", "gst": 81731, "cbdt": 78151, "telangana": 64722, "assam": 88650, "meghalaya": 80149}, 
{"date": "2025-09-05", "gst": 47096, "cbdt": 99348, "telangana": 5603, "assam": 62369, "meghalaya": 50929}, 
{"date": "2025-09-06", "gst": 59541, "cbdt": 33433, "telangana": 80772, "assam": 2196, "meghalaya": 85803}, 
{"date": "2025-09-07", "gst": 46386, "cbdt": 11738, "telangana": 96399, "assam": 6138, "meghalaya": 32384}, 
{"date": "2025-09-08", "gst": 42422, "cbdt": 59269, "telangana": 23750, "assam": 50750, "meghalaya": 19200}, 
{"date": "2025-09-09", "gst": 52069, "cbdt": 4031, "telangana": 47016, "assam": 50399, "meghalaya": 46141}, 
{"date": "2025-09-10", "gst": 61907, "cbdt": 11247, "telangana": 24749, "assam": 75069, "meghalaya": 42563}, 
{"date": "2025-09-11", "gst": 65342, "cbdt": 40258, "telangana": 10281, "assam": 21288, "meghalaya": 18783}, 
{"date": "2025-09-12", "gst": 24462, "cbdt": 80719, "telangana": 19978, "assam": 18075, "meghalaya": 48284}, 
{"date": "2025-09-13", "gst": 29740, "cbdt": 49477, "telangana": 50358, "assam": 59063, "meghalaya": 10317}, 
{"date": "2025-09-14", "gst": 47705, "cbdt": 13648, "telangana": 17560, "assam": 22683, "meghalaya": 95145}, 
{"date": "2025-09-15", "gst": 20271, "cbdt": 28706, "telangana": 41250, "assam": 1235, "meghalaya": 69580}, 
{"date": "2025-09-16", "gst": 24271, "cbdt": 4760, "telangana": 36673, "assam": 42583, "meghalaya": 60013}, 
{"date": "2025-09-17", "gst": 41438, "cbdt": 61497, "telangana": 61548, "assam": 49863, "meghalaya": 31205}, 
{"date": "2025-09-18", "gst": 90400, "cbdt": 66243, "telangana": 32824, "assam": 57369, "meghalaya": 9819}, 
{"date": "2025-09-19", "gst": 25742, "cbdt": 6100, "telangana": 81686, "assam": 24794, "meghalaya": 60939}, 
{"date": "2025-09-20", "gst": 24858, "cbdt": 93594, "telangana": 4481, "assam": 3850, "meghalaya": 85242}, 
{"date": "2025-09-21", "gst": 21032, "cbdt": 80705, "telangana": 52718, "assam": 79997, "meghalaya": 25424}, 
{"date": "2025-09-22", "gst": 11925, "cbdt": 12794, "telangana": 4993, "assam": 28369, "meghalaya": 67806}, 
{"date": "2025-09-23", "gst": 44537, "cbdt": 75691, "telangana": 47319, "assam": 39206, "meghalaya": 76548}, 
{"date": "2025-09-24", "gst": 96355, "cbdt": 40142, "telangana": 58261, "assam": 50277, "meghalaya": 70333}, 
{"date": "2025-09-25", "gst": 89497, "cbdt": 53266, "telangana": 74476, "assam": 68881, "meghalaya": 20453}, 
{"date": "2025-09-26", "gst": 7372, "cbdt": 88986, "telangana": 16855, "assam": 10875, "meghalaya": 36162}, 
{"date": "2025-09-27", "gst": 34674, "cbdt": 98403, "telangana": 99108, "assam": 77160, "meghalaya": 34696}, 
{"date": "2025-09-28", "gst": 53642, "cbdt": 67620, "telangana": 64803, "assam": 19196, "meghalaya": 82189}, 
{"date": "2025-09-29", "gst": 92301, "cbdt": 99163, "telangana": 47147, "assam": 91075, "meghalaya": 97986}, 
{"date": "2025-09-30", "gst": 50854, "cbdt": 36467, "telangana": 36395, "assam": 96131, "meghalaya": 87190}, 
{"date": "2025-10-01", "gst": 15783, "cbdt": 48244, "telangana": 15037, "assam": 4442, "meghalaya": 24751}, 
{"date": "2025-10-02", "gst": 49239, "cbdt": 55229, "telangana": 81791, "assam": 99627, "meghalaya": 34638}, 
{"date": "2025-10-03", "gst": 93439, "cbdt": 8224, "telangana": 28948, "assam": 64166, "meghalaya": 24378}, 
{"date": "2025-10-04", "gst": 15984, "cbdt": 24910, "telangana": 4505, "assam": 21521, "meghalaya": 88119}, 
{"date": "2025-10-05", "gst": 26865, "cbdt": 61137, "telangana": 31587, "assam": 95489, "meghalaya": 51304}, 
{"date": "2025-10-06", "gst": 32095, "cbdt": 18798, "telangana": 99151, "assam": 22055, "meghalaya": 42116}, 
{"date": "2025-10-07", "gst": 37673, "cbdt": 92116, "telangana": 48198, "assam": 20512, "meghalaya": 72962}, 
{"date": "2025-10-08", "gst": 8166, "cbdt": 12837, "telangana": 9385, "assam": 62683, "meghalaya": 11154}, 
{"date": "2025-10-09", "gst": 6418, "cbdt": 96940, "telangana": 5274, "assam": 49483, "meghalaya": 23181}, 
{"date": "2025-10-10", "gst": 83966, "cbdt": 13823, "telangana": 1244, "assam": 93706, "meghalaya": 9794}, 
{"date": "2025-10-11", "gst": 73587, "cbdt": 76012, "telangana": 28010, "assam": 17546, "meghalaya": 46677}, 
{"date": "2025-10-12", "gst": 97752, "cbdt": 28939, "telangana": 71336, "assam": 98731, "meghalaya": 27828}, 
{"date": "2025-10-13", "gst": 69870, "cbdt": 52257, "telangana": 97627, "assam": 39816, "meghalaya": 64202}, 
{"date": "2025-10-14", "gst": 9168, "cbdt": 16528, "telangana": 5810, "assam": 26103, "meghalaya": 90205}, 
{"date": "2025-10-15", "gst": 81691, "cbdt": 33117, "telangana": 84713, "assam": 98096, "meghalaya": 33011}, 
{"date": "2025-10-16", "gst": 99604, "cbdt": 32837, "telangana": 86431, "assam": 9009, "meghalaya": 42486}, 
{"date": "2025-10-17", "gst": 2499, "cbdt": 26824, "telangana": 52335, "assam": 29734, "meghalaya": 80318}, 
{"date": "2025-10-18", "gst": 15259, "cbdt": 20377, "telangana": 76320, "assam": 11330, "meghalaya": 97993}, 
{"date": "2025-10-19", "gst": 3422, "cbdt": 37501, "telangana": 33163, "assam": 3051, "meghalaya": 24754}, 
{"date": "2025-10-20", "gst": 32578, "cbdt": 9091, "telangana": 87420, "assam": 7785, "meghalaya": 82113}, 
{"date": "2025-10-21", "gst": 77676, "cbdt": 64787, "telangana": 52793, "assam": 24081, "meghalaya": 58458}, 
{"date": "2025-10-22", "gst": 87424, "cbdt": 72165, "telangana": 59874, "assam": 87247, "meghalaya": 80715}, 
{"date": "2025-10-23", "gst": 72060, "cbdt": 8821, "telangana": 15436, "assam": 37122, "meghalaya": 93446}, 
{"date": "2025-10-24", "gst": 17508, "cbdt": 91881, "telangana": 81584, "assam": 23414, "meghalaya": 64541}, 
{"date": "2025-10-25", "gst": 43368, "cbdt": 29751, "telangana": 29948, "assam": 31948, "meghalaya": 48278}, 
{"date": "2025-10-26", "gst": 2803, "cbdt": 56115, "telangana": 25533, "assam": 95991, "meghalaya": 94403}, 
{"date": "2025-10-27", "gst": 13031, "cbdt": 49067, "telangana": 67932, "assam": 34618, "meghalaya": 14783}, 
{"date": "2025-10-28", "gst": 15245, "cbdt": 8176, "telangana": 31278, "assam": 55388, "meghalaya": 43844}, 
{"date": "2025-10-29", "gst": 82137, "cbdt": 69046, "telangana": 72884, "assam": 44711, "meghalaya": 75069}, 
{"date": "2025-10-30", "gst": 13297, "cbdt": 66695, "telangana": 55427, "assam": 84617, "meghalaya": 88190}, 
{"date": "2025-10-31", "gst": 99128, "cbdt": 59006, "telangana": 1053, "assam": 89053, "meghalaya": 57534}, 
{"date": "2025-11-01", "gst": 10405, "cbdt": 50329, "telangana": 71673, "assam": 17533, "meghalaya": 59684}, 
{"date": "2025-11-02", "gst": 21373, "cbdt": 72466, "telangana": 5945, "assam": 25847, "meghalaya": 48790}, 
{"date": "2025-11-03", "gst": 47040, "cbdt": 71902, "telangana": 50871, "assam": 4317, "meghalaya": 66562}, 
{"date": "2025-11-04", "gst": 66512, "cbdt": 90061, "telangana": 12599, "assam": 39895, "meghalaya": 95486}, 
{"date": "2025-11-05", "gst": 92509, "cbdt": 26749, "telangana": 71320, "assam": 27346, "meghalaya": 20960}, 
{"date": "2025-11-06", "gst": 77882, "cbdt": 76876, "telangana": 6101, "assam": 51215, "meghalaya": 20019}, 
{"date": "2025-11-07", "gst": 99740, "cbdt": 60539, "telangana": 94420, "assam": 36583, "meghalaya": 25751}, 
{"date": "2025-11-08", "gst": 34461, "cbdt": 26556, "telangana": 1369, "assam": 69797, "meghalaya": 96173}, 
{"date": "2025-11-09", "gst": 68491, "cbdt": 69050, "telangana": 60056, "assam": 29915, "meghalaya": 6268}, 
{"date": "2025-11-10", "gst": 92816, "cbdt": 77836, "telangana": 74953, "assam": 54233, "meghalaya": 41066}, 
{"date": "2025-11-11", "gst": 4034, "cbdt": 90630, "telangana": 82111, "assam": 18935, "meghalaya": 41432}, 
{"date": "2025-11-12", "gst": 64425, "cbdt": 7348, "telangana": 34329, "assam": 64346, "meghalaya": 88338}, 
{"date": "2025-11-13", "gst": 37211, "cbdt": 51567, "telangana": 31999, "assam": 19992, "meghalaya": 7257}, 
{"date": "2025-11-14", "gst": 14989, "cbdt": 81632, "telangana": 45732, "assam": 41229, "meghalaya": 66069}, 
{"date": "2025-11-15", "gst": 90967, "cbdt": 47966, "telangana": 41107, "assam": 25079, "meghalaya": 3622}, 
{"date": "2025-11-16", "gst": 20784, "cbdt": 23423, "telangana": 89704, "assam": 73746, "meghalaya": 93621}, 
{"date": "2025-11-17", "gst": 9758, "cbdt": 25332, "telangana": 90943, "assam": 34339, "meghalaya": 37593}, 
{"date": "2025-11-18", "gst": 71667, "cbdt": 78671, "telangana": 10071, "assam": 24565, "meghalaya": 76771}, 
{"date": "2025-11-19", "gst": 36309, "cbdt": 56978, "telangana": 16012, "assam": 48626, "meghalaya": 35172}, 
{"date": "2025-11-20", "gst": 28966, "cbdt": 51913, "telangana": 36911, "assam": 90490, "meghalaya": 16397}, 
{"date": "2025-11-21", "gst": 68484, "cbdt": 1942, "telangana": 76172, "assam": 87546, "meghalaya": 80913}, 
{"date": "2025-11-22", "gst": 50491, "cbdt": 53349, "telangana": 40797, "assam": 25956, "meghalaya": 78242}, 
{"date": "2025-11-23", "gst": 81114, "cbdt": 65173, "telangana": 69841, "assam": 68917, "meghalaya": 52882}, 
{"date": "2025-11-24", "gst": 70601, "cbdt": 30077, "telangana": 68799, "assam": 43826, "meghalaya": 99272}, 
{"date": "2025-11-25", "gst": 13213, "cbdt": 57193, "telangana": 58635, "assam": 21758, "meghalaya": 52614}, 
{"date": "2025-11-26", "gst": 26461, "cbdt": 8020, "telangana": 37520, "assam": 61010, "meghalaya": 30561}, 
{"date": "2025-11-27", "gst": 19232, "cbdt": 8135, "telangana": 55087, "assam": 69316, "meghalaya": 48006}, 
{"date": "2025-11-28", "gst": 44944, "cbdt": 24043, "telangana": 55154, "assam": 96105, "meghalaya": 38556}, 
{"date": "2025-11-29", "gst": 75399, "cbdt": 63370, "telangana": 5182, "assam": 19153, "meghalaya": 18823}, 
{"date": "2025-11-30", "gst": 49296, "cbdt": 24678, "telangana": 53652, "assam": 21657, "meghalaya": 98939}, 
{"date": "2025-12-01", "gst": 25443, "cbdt": 52801, "telangana": 47723, "assam": 46250, "meghalaya": 17589}, 
{"date": "2025-12-02", "gst": 22794, "cbdt": 11471, "telangana": 31360, "assam": 84619, "meghalaya": 87100}, 
{"date": "2025-12-03", "gst": 39989, "cbdt": 91741, "telangana": 40790, "assam": 13284, "meghalaya": 1018}, 
{"date": "2025-12-04", "gst": 53854, "cbdt": 12698, "telangana": 38489, "assam": 21962, "meghalaya": 67595}, 
{"date": "2025-12-05", "gst": 68275, "cbdt": 70066, "telangana": 57527, "assam": 37455, "meghalaya": 47546}, 
{"date": "2025-12-06", "gst": 79323, "cbdt": 37999, "telangana": 50467, "assam": 68486, "meghalaya": 9439}, 
{"date": "2025-12-07", "gst": 83193, "cbdt": 23174, "telangana": 98375, "assam": 52897, "meghalaya": 75331}, 
{"date": "2025-12-08", "gst": 22854, "cbdt": 30454, "telangana": 73701, "assam": 21848, "meghalaya": 8896}, 
{"date": "2025-12-09", "gst": 5602, "cbdt": 83813, "telangana": 72375, "assam": 50622, "meghalaya": 34912}, 
{"date": "2025-12-10", "gst": 13415, "cbdt": 43146, "telangana": 77568, "assam": 77452, "meghalaya": 82173}, 
{"date": "2025-12-11", "gst": 48408, "cbdt": 10861, "telangana": 28156, "assam": 60594, "meghalaya": 21739}, 
{"date": "2025-12-12", "gst": 48520, "cbdt": 89999, "telangana": 52736, "assam": 77009, "meghalaya": 54302}, 
{"date": "2025-12-13", "gst": 87990, "cbdt": 21353, "telangana": 28425, "assam": 93497, "meghalaya": 67125}, 
{"date": "2025-12-14", "gst": 55419, "cbdt": 26026, "telangana": 69165, "assam": 26658, "meghalaya": 55943}, 
{"date": "2025-12-15", "gst": 14628, "cbdt": 32242, "telangana": 74545, "assam": 47941, "meghalaya": 26398}, 
{"date": "2025-12-16", "gst": 51222, "cbdt": 63163, "telangana": 39445, "assam": 74163, "meghalaya": 81779}, 
{"date": "2025-12-17", "gst": 74808, "cbdt": 15572, "telangana": 71737, "assam": 68750, "meghalaya": 82192}, 
{"date": "2025-12-18", "gst": 34490, "cbdt": 34215, "telangana": 48245, "assam": 16044, "meghalaya": 18412}, 
{"date": "2025-12-19", "gst": 89058, "cbdt": 89393, "telangana": 44728, "assam": 19411, "meghalaya": 34166}, 
{"date": "2025-12-20", "gst": 1796, "cbdt": 96987, "telangana": 55597, "assam": 55235, "meghalaya": 96768}, 
{"date": "2025-12-21", "gst": 96070, "cbdt": 21288, "telangana": 15799, "assam": 74512, "meghalaya": 34175}, 
{"date": "2025-12-22", "gst": 92048, "cbdt": 74880, "telangana": 3019, "assam": 80659, "meghalaya": 58159}, 
{"date": "2025-12-23", "gst": 7301, "cbdt": 69407, "telangana": 11680, "assam": 59372, "meghalaya": 18269}, 
{"date": "2025-12-24", "gst": 68166, "cbdt": 83076, "telangana": 95408, "assam": 6669, "meghalaya": 78526}, 
{"date": "2025-12-25", "gst": 14588, "cbdt": 33284, "telangana": 9214, "assam": 59677, "meghalaya": 5224}, 
{"date": "2025-12-26", "gst": 73565, "cbdt": 45644, "telangana": 74152, "assam": 15897, "meghalaya": 35826}, 
{"date": "2025-12-27", "gst": 11814, "cbdt": 36346, "telangana": 47638, "assam": 24875, "meghalaya": 48578}, 
{"date": "2025-12-28", "gst": 32829, "cbdt": 30811, "telangana": 77761, "assam": 32773, "meghalaya": 19667}, 
{"date": "2025-12-29", "gst": 64613, "cbdt": 64545, "telangana": 91195, "assam": 82754, "meghalaya": 9310}, 
{"date": "2025-12-30", "gst": 48710, "cbdt": 14410, "telangana": 71629, "assam": 40342, "meghalaya": 52342}, 
{"date": "2025-12-31", "gst": 93194, "cbdt": 54039, "telangana": 54398, "assam": 96336, "meghalaya": 14365}
]
// ✅ Config for each line (ChartContainer will create --color-* vars for these keys)
const chartConfig = {
  // meta key, not rendered as a line
  views: {
    label: "Tax Collections",
  },
  gst: {
    label: "GST",
    color: "var(--chart-1)",
  },
  cbdt: {
    label: "CBDT",
    color: "var(--chart-2)",
  },
  telangana: {
    label: "Telangana",
    color: "var(--chart-3)",
  },
  assam: {
    label: "Assam",
    color: "var(--chart-4)",
  },
  meghalaya: {
    label: "Meghalaya",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("gst")

  // ✅ Compute totals for each tax key
  const total = React.useMemo(
    () => ({
      gst: chartData.reduce((acc, curr) => acc + curr.gst, 0),
      cbdt: chartData.reduce((acc, curr) => acc + curr.cbdt, 0),
      telangana: chartData.reduce((acc, curr) => acc + curr.telangana, 0),
      assam: chartData.reduce((acc, curr) => acc + curr.assam, 0),
      meghalaya: chartData.reduce((acc, curr) => acc + curr.meghalaya, 0),
    }),
    []
  )

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1">
      <Card className="py-4 sm:py-0">
        <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
            <CardTitle>Individual Tax Summary - Interactive</CardTitle>
            <CardDescription>
              Showing total tax values for GST, CBDT and selected states
            </CardDescription>
          </div>
          <div className="flex flex-wrap">
            {(
              ["gst", "cbdt", "telangana", "assam", "meghalaya"] as Array<
                keyof typeof chartConfig
              >
            ).map((chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex min-w-[120px] flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-4"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-2xl">
                  {
                    // @ts-ignore – we know total has same keys
                    total[chart].toLocaleString()
                  }
                </span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[180px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
