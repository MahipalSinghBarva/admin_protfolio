import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import {
  deleteExperience,
  getAllExperience,
} from "@/store/slices/experninceSlice";
import {
  clearAllTimelineErrors,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { TabsContent } from "@radix-ui/react-tabs";
import { Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageExpernince = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timelineId, setexperininceId] = useState();

  const { loading, message, error, expernince } = useSelector(
    (state) => state.expernince
  );
  // console.log(expernince);

  const handleDeleteExpernince = (id) => {
    setexperininceId(id);
    dispatch(deleteExperience(id));
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllExperience());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center border-b-2">
              <CardTitle>Manage Your Experience</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 mt-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expernince?.expernince?.length > 0 ? (
                    expernince?.expernince?.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium">
                            {element.designation}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.details}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.to ? element.to : "____"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                            justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                              onClick={() =>
                                handleDeleteExpernince(element._id)
                              }
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <Link to={`/update/expernince/${element._id}`}>
                              <button
                                className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                            justify-center items-center text-green-600  hover:text-slate-50 hover:bg-green-600"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any Experinince.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageExpernince;
