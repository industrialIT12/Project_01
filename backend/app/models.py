from flask import current_app,request,jsonify
import pymysql.cursors
from datetime import datetime,timedelta
from decimal import Decimal
from icecream import ic


def get_db_connection():
    return pymysql.connect(
         host=current_app.config['DB_HOST'],  # Correct key for host
        user=current_app.config['DB_USER'],  # Correct key for user
        password=current_app.config['DB_PASSWORD'],  # Correct key for password
        db=current_app.config['DB_NAME'],  # Correct key for database
        cursorclass=pymysql.cursors.DictCursor
    )

class Details:

    def get_all_plans(selected_business):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()

            # Convert the comma-separated values into a list
            business_list = selected_business.split(',') if selected_business else []

            query = "SELECT * FROM details"
            params = []

            if business_list:
                placeholders = ','.join(['%s'] * len(business_list))
                query += f" WHERE customer_category IN ({placeholders})"
                params.extend(business_list)

            cursor.execute(query, tuple(params) if params else None)

            rows = cursor.fetchall()
            connection.close()

            return rows
        except Exception as e:
            print("Error fetching data:", e)
            return {'error': str(e)}

        
    def get_all_plans2(id=None):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            ic(id)
            query = "SELECT * FROM details where id=%s"
            cursor.execute(query,(id,))

            rows = cursor.fetchall()
            connection.close()
            return rows
        except Exception as e:
            print("Error fetching data:", e)
            return {'error': str(e)}
        
    def team_details(project_id=None):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            query = "SELECT * FROM details where id=%s"
            cursor.execute(query,(project_id,))

            rows = cursor.fetchall()
            connection.close()
            return rows
            
        except Exception as e:
            print("Error fetching data:", e)
            return {'error': str(e)}



        

    def add_project(data):
        try:
            
            apqpphase = int(data.get('apqpphase'))
            bd = data.get('bd')
            customercategory = data.get('customercategory')
            customer_name = data.get('customer_name')
            end_date = data.get('end_date')
            epdmparts = int(data.get('epdmparts'))
            extparts =int(data.get('extparts'))
            injparts = int(data.get('injparts'))
            lab = data.get('lab')
            mfg = data.get('mfg')
            nosofproject = int(data.get('nosofproject'))
            plant = data.get('plant')
            plmc = data.get('plmc')
            pe = data.get('pe')
            pm = data.get('pm')
            project_name = data.get('project_name')
            sopdate = data.get('sopdate')
            spm = data.get('spm')
            start_date = data.get('start_date')
            scm = data.get('scm')
            td = data.get('td')
            zone = data.get('zone')
            

            start_date = datetime.strptime(start_date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')
            end_date = datetime.strptime(end_date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')
            
            mfg_str = ', '.join(mfg) if isinstance(mfg, list) else mfg
            pm_str = ', '.join(pm) if isinstance(pm, list) else pm
            pe_str = ', '.join(pe) if isinstance(pe, list) else pe
            bd_str = ', '.join(bd) if isinstance(bd, list) else bd
            scm_str = ', '.join(scm) if isinstance(scm, list) else scm
            td_str = ', '.join(td) if isinstance(td, list) else td
            lab_str = ', '.join(lab) if isinstance(lab, list) else lab
            spm_str = ', '.join(spm) if isinstance(spm, list) else spm
            plmc_str = ', '.join(plmc) if isinstance(plmc, list) else plmc
            
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            if not project_name or not start_date or not end_date:
                raise ValueError("Missing required fields")

            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO details (project_name,start_date,end_date, customer_name, phase, customer_category,
                            Nos_of_projects, SOP_date, Nos_of_Injection_Moulding_projects, Nos_of_Injection_Extrusion_projects, Nos_of_EPDM_Extrusion_projects,
                            Zone, Plant, project_mgmt_team, project_eng_team, business_development_team, supply_chain_mgmt_team, tool_develop_team, laboratory, 
                           spm_team, plmc_team, manufacturing)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,  %s, %s, %s, %s, %s, %s,%s, %s, %s, %s,%s, %s)
            """, (project_name, start_date, end_date,customer_name,apqpphase,customercategory,
                  nosofproject,sopdate,injparts,extparts,epdmparts,zone, plant, pm_str, 
                  pe_str, bd_str, scm_str, td_str, 
                  lab_str, spm_str, plmc_str, mfg_str))

            connection.commit()
            connection.close()
            print("Project added Succesfully")

            return None

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def add_mom(data):
        try:
            # usersemail = {     
            #             "amitkumardepa": "industrialit@ppapco.com",    
            #             "harshsharmadepb": "industrialitp2@ppapco.com",  
            #             "ankitsrivastavadepc": "ankit@ppapco.com"
            #         }
            # usersname = {     
            #             "amitkumardepa": "Amit Kumar Dept. A",    
            #             "harshsharmadepb": "Harsh Sharma Dept. B",  
            #             "ankitsrivastavadepc": "Ankit Srivastava Dept. C"
            #         }
            date = data.get('date')
            part_name = data.get('part_name')
            update = data.get('update')
            concernpoint = data.get('concernpoint')
            project_id = data.get('project_id')
            Raised_by = data.get('Raised_by')
            Action = data.get('Action')
            Latest_update = data.get('date')
            Responsibility = data.get('Responsibility')
            TDC = data.get('TDC')
            RaisedBydept = data.get('RaisedBydept')
            Respdept = data.get('Respdept')
            status= "Open"
            # username = usersname.get(Raised_by)
            # # email = usersemail.get(Raised_by)
            ic(data)

            date = datetime.strptime(date, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')
            Latest_update = datetime.strptime(Latest_update, '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%Y-%m-%d %H:%M:%S')
            
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO MOM (id, date, concern_point_discussed, action,latest_update,updatee,resp, raised_by,raisedby_department,  resp_department, tdc, status, part_name )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s)
            """, (project_id, date, concernpoint, Action, Latest_update,update, Responsibility,Raised_by,RaisedBydept,Respdept, TDC, "Open", part_name ))

            connection.commit()
            connection.close()
            print('SUCC')


            return print({'message': 'Project added successfully'}), 201

        except Exception as e:
            return print(e), 500
    
    def get_mom(project_id=None):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()  # Returns results as dictionaries

            data=[]
            query = """
                SELECT 
                    part_name,
                    COUNT(*) AS total_concerns,
                    SUM(CASE WHEN status = 'open' AND DATEDIFF(CURDATE(), date) BETWEEN 0 AND 3 THEN 1 ELSE 0 END) AS open_for_3_days,
                    SUM(CASE WHEN status = 'open' AND DATEDIFF(CURDATE(), date) BETWEEN 4 AND 7 THEN 1 ELSE 0 END) AS open_for_4_7_days,
                    SUM(CASE WHEN status = 'open' AND DATEDIFF(CURDATE(), date) BETWEEN 8 AND 15 THEN 1 ELSE 0 END) AS open_for_8_15_days,
                    SUM(CASE WHEN status = 'open' AND DATEDIFF(CURDATE(), date) > 15 THEN 1 ELSE 0 END) AS open_for_16_days
                FROM MOM
                WHERE id = %s  
                GROUP BY part_name;
                """

            # Execute query
            cursor.execute(query, (project_id,))  # This line could be causing the error
            results = cursor.fetchall()
            cursor.close()
            connection.close()

            return results  

        except Exception as e:
            print(f"🔥 ERROR: {e}")  # Print error in Flask console
            return {"error": str(e)}  # Return error as JSON response



    def get_mom_table(project_id=None):
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            # Use a straightforward query without unnecessary aliasing
            if project_id is not None:
                cursor.execute("SELECT * FROM MOM WHERE id = %s", (project_id,))
            else:
                cursor.execute("SELECT * FROM MOM")
            
            rows = cursor.fetchall()
            connection.close()
            
            # Process rows to calculate day count
            processed_rows = []
            for row in rows:    
                try:
                    # Access the 'date' and 'status' keys correctly
                    date_value = row.get('date')  # Adjust based on the column index if row is not a dict
                    status = row.get('status')   # Adjust based on the column index if row is not a dict
                    
                    # Calculate day count
                    if status.lower() == 'close':
                        day_count = 'NA'
                    elif date_value:
                        # Ensure 'date' is processed correctly as a datetime object
                        if isinstance(date_value, datetime):
                            day_count = (datetime.now() - date_value).days
                        else:
                            raise ValueError("Date is not in datetime format")
                    else:
                        day_count = 'Invalid Date'
                    
                    # Append day count to the row
                    row_with_day_count = dict(row)
                    row_with_day_count['day_count'] = day_count
                    processed_rows.append(row_with_day_count)
                except Exception as row_error:
                    print(f"Error processing row: {row}, Error: {row_error}")
            
            return processed_rows
        
        except Exception as e:
            print(f"Error in get_mom_table: {e}")
            return {"error": "Internal server error", "details": str(e)}




    
    def update_phase(phase, id):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            if id is not None:
                cursor.execute("UPDATE details SET phase = %s WHERE id = %s", (phase, id))
                print(f"Updated phase to {phase} for ID {id}.")
            else:
                cursor.execute("SELECT * FROM MOM")
                results = cursor.fetchall()
                print("Fetched all records from MOM.")
                return results
            connection.commit()
        except Exception as e:
            print("An error occurred:", e)
        finally:
            cursor.close()
            connection.close()


    def get_project_count():
        connection = get_db_connection()  
        cursor = connection.cursor()       

        try:
            cursor.execute("SELECT SUM(Nos_of_Injection_Moulding_projects) as inj, SUM(Nos_of_Injection_Extrusion_projects) as ext, sum(Nos_of_EPDM_Extrusion_projects) as epdm FROM details")
            result = cursor.fetchone()     

            inj_count = float(result['inj']) if result['inj'] is not None else 0
            ext_count = float(result['ext']) if result['ext'] is not None else 0
            epdm_count = float(result['epdm']) if result['epdm'] is not None else 0

            return {
                "inj": inj_count,  
                "ext": ext_count, 
                "epdm": epdm_count, 
            }

        except Exception as e:
            print(f"An error occurred: {e}")
            return None

        finally:
            cursor.close()    # Close the cursor
            connection.close() # Close the database connection

    def get_business_piechart():
        connection = get_db_connection()  
        cursor = connection.cursor()       

        try:
            cursor.execute("SELECT SUM(Nos_of_projects) as oem FROM details where customer_category = 'OEM'")
            result1 = cursor.fetchone()     
            oem = float(result1['oem']) if result1['oem'] is not None else 0
            cursor.execute("SELECT SUM(Nos_of_projects) as elpis FROM details where customer_category = 'elpis'")
            result2 = cursor.fetchone()
            elpis = float(result2['elpis']) if result2['elpis'] is not None else 0
            cursor.execute("SELECT SUM(Nos_of_projects) as avinya FROM details where customer_category = 'avinya'")
            result3 = cursor.fetchone()
            avinya = float(result3['avinya']) if result3['avinya'] is not None else 0

            return {
                "oem": oem,  
                "elpis": elpis, 
                "avinya": avinya, 
            }

        except Exception as e:
            print(f"An error occurred: {e}")
            return None

        finally:
            cursor.close()    # Close the cursor
            connection.close() # Close the database connection

    def get_businesssegment():
        connection = get_db_connection()  
        cursor = connection.cursor()       

        try:
            cursor.execute("""SELECT SUM(Nos_of_Injection_Moulding_projects) as inj_oem, SUM(Nos_of_Injection_Extrusion_projects) as ext_oem,
                            sum(Nos_of_EPDM_Extrusion_projects) as epdm_oem FROM details where customer_category = 'OEM'""")
            result = cursor.fetchone()     
            inj_oem = float(result['inj_oem']) if result['inj_oem'] is not None else 0
            ext_oem = float(result['ext_oem']) if result['ext_oem'] is not None else 0
            epdm_oem = float(result['epdm_oem']) if result['epdm_oem'] is not None else 0
            cursor.execute("""SELECT SUM(Nos_of_Injection_Moulding_projects) as inj_avinya, SUM(Nos_of_Injection_Extrusion_projects) as ext_avinya,
                            sum(Nos_of_EPDM_Extrusion_projects) as epdm_avinya FROM details where customer_category = 'Avinya'""")
            result2 = cursor.fetchone()     
            inj_avinya = float(result2['inj_avinya']) if result2['inj_avinya'] is not None else 0
            ext_avinya = float(result2['ext_avinya']) if result2['ext_avinya'] is not None else 0
            epdm_avinya = float(result2['epdm_avinya']) if result2['epdm_avinya'] is not None else 0
            cursor.execute("""SELECT SUM(Nos_of_Injection_Moulding_projects) as inj_elpis, SUM(Nos_of_Injection_Extrusion_projects) as ext_elpis,
                            sum(Nos_of_EPDM_Extrusion_projects) as epdm_elpis FROM details where customer_category = 'Elpis'""")
            result3 = cursor.fetchone()     
            inj_elpis = float(result3['inj_elpis']) if result3['inj_elpis'] is not None else 0
            ext_elpis = float(result3['ext_elpis']) if result3['ext_elpis'] is not None else 0
            epdm_elpis = float(result3['epdm_elpis']) if result3['epdm_elpis'] is not None else 0

            return {
                "inj_oem": inj_oem,  
                "ext_oem": ext_oem, 
                "epdm_oem": epdm_oem, 
                "inj_avinya": inj_avinya,  
                "ext_avinya": ext_avinya, 
                "epdm_avinya": epdm_avinya, 
                "inj_elpis": inj_elpis,  
                "ext_elpis": ext_elpis, 
                "epdm_elpis": epdm_elpis, 
            }

        except Exception as e:
            print(f"An error occurred: {e}")
            return None

        finally:
            cursor.close()    # Close the cursor
            connection.close() # Close the database connection

    def get_openconcern_bar(project_id=None):
        connection = get_db_connection()  
        cursor = connection.cursor()       

        try:
            cursor.execute("SELECT COUNT(*) as count, resp FROM MOM WHERE id = %s GROUP BY resp;", (project_id,))
            results = cursor.fetchall()  

            responsibility = []
            for result in results:
                count = float(result['count']) if result['count'] is not None else 0
                resp = result['resp']
                responsibility.append({"count": count, "responsibility": resp})
            return responsibility
        except Exception as e:
            print(f"An error occurred: {e}")
            return None

        finally:
            cursor.close()    # Close the cursor
            connection.close() # Close the database connection

    def get_openconcern_line(project_id=None):
        connection = get_db_connection()
        cursor = connection.cursor()

        try:
            # Query for 'open' status
            cursor.execute(
                "SELECT COUNT(*) as count, resp FROM MOM WHERE id = %s AND status = 'open' GROUP BY resp;",
                (project_id,)
            )
            open_results = cursor.fetchall()

            # Query for 'close' status
            cursor.execute(
                "SELECT COUNT(*) as count, resp FROM MOM WHERE id = %s AND status = 'close' GROUP BY resp;",
                (project_id,)
            )
            close_results = cursor.fetchall()

            # Prepare response with both 'open' and 'close' counts
            responsibility = []
            resp_dict = {}

            for result in open_results:
                resp = result['resp']
                resp_dict[resp] = {"responsibility": resp, "open_count": float(result['count'])}

            for result in close_results:
                resp = result['resp']
                if resp in resp_dict:
                    resp_dict[resp]["close_count"] = float(result['count'])
                else:
                    resp_dict[resp] = {"responsibility": resp, "open_count": 0, "close_count": float(result['count'])}

            # Transform dictionary to list
            responsibility = list(resp_dict.values())
            return responsibility

        except Exception as e:
            print(f"An error occurred: {e}")
            return None

        finally:
            cursor.close()  # Close the cursor
            connection.close()  # Close the database connection


    def dev_details(data,project_id=None):
        try:
            
            part_name = data.get('part_name')
            partno = data.get('partno')
            annual_vol = data.get('annual_vol')
            firstpart_subbmission = data.get('firstpart_subbmission')
            productdsgn_resp = data.get('productdsgn_resp')
            tooling_resp = data.get('tooling_resp')
            mfg_location = data.get('mfg_location')
            
            if not data:
                return jsonify({'error': 'No data provided'}), 400

            connection = get_db_connection()
            cursor = connection.cursor()
            
            if project_id is not None:
                cursor.execute("""
                    INSERT INTO dev_details (`part_name`, `project_id`, `part_no`, `annual_vol`, `first_part_submission`, `product_design_resp`, `tooling_resp`, `manufacturing_location` )
                    VALUES (%s,%s, %s, %s, %s, %s, %s, %s)
                """, (part_name, project_id, partno, annual_vol, firstpart_subbmission, productdsgn_resp, tooling_resp, mfg_location  ))
            else:
                cursor.execute("""
                    INSERT INTO dev_details (`part_name`, `part_no`, `annual_vol`, `first_part_submission`, `product_design_resp`, `tooling_resp`, `manufacturing_location` )
                    VALUES (%s,%s, %s, %s, %s, %s, %s, %s)
                """, (part_name, partno, annual_vol, firstpart_subbmission, productdsgn_resp, tooling_resp, mfg_location  ))

            connection.commit()
            connection.close()
            print('SUCC')


            return print({'message': 'Project added successfully'}), 201

        except Exception as e:
            return print(e), 500
        

    def get_dev(project_id=None):
        connection = get_db_connection()
        cursor = connection.cursor()
        if project_id is not None:
            cursor.execute("SELECT * FROM dev_details WHERE project_id = %s", (project_id,))
        else:
            cursor.execute("SELECT * FROM dev_details")
        rows = cursor.fetchall()
        connection.close()
        return rows

    def update_mom(data):
        point_id = data.get('point_id')
        status = data.get('status')  # Use .get() to avoid KeyError
        sl_no = data.get('sl_no')
        action = data.get('action')
        update = data.get('update')
        latest_update = data.get('latest_update')
        tdc = data.get('tdc')

        # Handle datetime conversion and addition of one day if values are provided
        if latest_update:
            latest_update = datetime.fromisoformat(latest_update.replace("Z", "+00:00")) + timedelta(days=1)
        if tdc:
            tdc = datetime.fromisoformat(tdc.replace("Z", "+00:00")) + timedelta(days=1)

        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            # Build dynamic SQL query based on provided data
            update_fields = []
            update_values = []

            if status:
                update_fields.append("status = %s")
                update_values.append(status)

            if action:
                update_fields.append("action = %s")
                update_values.append(action)

            if latest_update:
                update_fields.append("latest_update = %s")
                update_values.append(latest_update)

            if update:
                update_fields.append("updatee = %s")
                update_values.append(update)

            if tdc:
                update_fields.append("tdc = %s")
                update_values.append(tdc)

            # Ensure sl_no is included
            update_values.append(sl_no)

            # Execute the query only if there are fields to update
            if update_fields:
                query = f"UPDATE MOM SET {', '.join(update_fields)} WHERE sl_no = %s"
                cursor.execute(query, update_values)
                print(f"Updated MOM entry with sl_no {sl_no}.")
            else:
                print("No fields to update.")

            connection.commit()

        except Exception as e:
            print("An error occurred:", e)
            raise e

        finally:
            cursor.close()
            connection.close()

    def update_dev(data):
            ic(data)
            point_id = data.get('point_id')
            id = data.get('id')
            partname = data.get('partname')  # Use .get() to avoid KeyError
            partno = data.get('partno')
            annualvol = data.get('annualvol')
            firstpart = data.get('firstpart')
            designresp = data.get('designresp')
            toolingresp = data.get('toolingresp')
            mfglocation = data.get('mfglocation')

            if firstpart:
                firstpart = datetime.fromisoformat(firstpart.replace("Z", "+00:00")) + timedelta(days=1)

            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if partname:
                    update_fields.append("part_name = %s")
                    update_values.append(partname)

                if partno:
                    update_fields.append("part_no = %s")
                    update_values.append(partno)

                if annualvol:
                    update_fields.append("annual_vol = %s")
                    update_values.append(annualvol)

                if firstpart:
                    update_fields.append("first_part_submission = %s")
                    update_values.append(firstpart)

                if designresp:
                    update_fields.append("product_design_resp = %s")
                    update_values.append(designresp)

                if toolingresp:
                    update_fields.append("tooling_resp = %s")
                    update_values.append(toolingresp)

                if mfglocation:
                    update_fields.append("manufacturing_location = %s")
                    update_values.append(mfglocation)

                # Ensure sl_no is included
                update_values.append(id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE dev_details SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()


    def timep_data(data, project_id=None):
        try:
            monthyear = data.get('monthyear')  # Expecting 'YYYY-MM'
            activity = data.get('activity')
            type = data.get('type')

            if not data:
                raise ValueError('No data provided')

            # Append '-01' for 'YYYY-MM-DD' if the column expects a DATE type
            if monthyear:
                monthyear += '-01'

            connection = get_db_connection()
            cursor = connection.cursor()
            
            cursor.execute("""
            SELECT project_name, customer_name, Nos_of_projects 
            FROM details 
            WHERE id = %s
            """, (project_id,))
        
            fetched_data = cursor.fetchone()
            
            if not fetched_data:
                raise ValueError(f"No project found with id {project_id}")

            project_name=fetched_data['project_name']
            customer_name=fetched_data['customer_name']
            Nos_of_projects=fetched_data['Nos_of_projects']

            # Insert data into timing_plan along with fetched details
            cursor.execute("""
                INSERT INTO timing_plan 
                (project_id, monthyear, point_description, type, project_name, customer_name, Nos_of_projects,status) 
                VALUES (%s, %s, %s, %s, %s, %s, %s,%s)
            """, (project_id, monthyear, activity, type, project_name, customer_name, Nos_of_projects,'Upcoming'))

            connection.commit()
            connection.close()

            # Return a simple dictionary indicating success
            return {'message': 'Timing plan added successfully'}

        except Exception as e:
            import traceback
            print("Error:", traceback.format_exc())
            # Return the error as a dictionary
            return {'error': str(e)}
        
    def get_event(project_id=None):
        print("project_ID", project_id)
        connection = get_db_connection()
        cursor = connection.cursor()
        result = []  # Initialize result as an empty list
        
        if project_id is not None:
            cursor.execute("SELECT start_date, end_date FROM details WHERE id = %s", (project_id,))
            data = cursor.fetchall()
            if not data:  # Check if no data is returned
                print("No details found for project ID:", project_id)
                connection.close()
                return None

            start_date = data[0]['start_date']
            end_date = data[0]['end_date']

            cursor.execute("SELECT * FROM timing_plan WHERE project_id = %s", (project_id,))
            data2 = cursor.fetchall()

            for row in data2:
                point_id = row['point_id']
                monthyear = row['monthyear']
                point_description = row['point_description']
                type = row['type']
                status = row['status']
                result.append({
                    "start_date": start_date,
                    "end_date": end_date,
                    "point_id": point_id,
                    "monthyear": monthyear,
                    "point_description": point_description,
                    "type": type,
                    "status": status,
                })
        else:
            cursor.execute("SELECT * FROM timing_plan")
            rows = cursor.fetchall()
            result = rows  # Return rows directly if no `project_id` is provided

        connection.close()
        return result
    

    def update_details(data):
            project_id = data.get('project_id')
            customername = data.get('customername')  # Use .get() to avoid KeyError
            model = data.get('model')
            startdate = data.get('startdate')
            enddate = data.get('enddate')
            sopdate = data.get('sopdate')

            if startdate:
                startdate = datetime.fromisoformat(startdate.replace("Z", "+00:00")) + timedelta(days=1)

            if enddate:
                enddate = datetime.fromisoformat(enddate.replace("Z", "+00:00")) + timedelta(days=1)

            if sopdate:
                sopdate = datetime.fromisoformat(sopdate.replace("Z", "+00:00")) + timedelta(days=1)

            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if customername:
                    update_fields.append("customer_name = %s")
                    update_values.append(customername)

                if model:
                    update_fields.append("project_name = %s")
                    update_values.append(model)

                if startdate:
                    update_fields.append("start_date = %s")
                    update_values.append(startdate)

                if enddate:
                    update_fields.append("end_date = %s")
                    update_values.append(enddate)

                if sopdate:
                    update_fields.append("sop_date = %s")
                    update_values.append(sopdate)

                # Ensure sl_no is included
                update_values.append(id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE details SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    def get_allmom():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM MOM")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()

                processed_rows = []
            for row in rows:    
                try:
                    # Access the 'date' and 'status' keys correctly
                    date_value = row.get('date')  # Adjust based on the column index if row is not a dict
                    status = row.get('status')   # Adjust based on the column index if row is not a dict
                    
                    # Calculate day count
                    if status.lower() == 'close':
                        day_count = 'NA'
                    elif date_value:
                        # Ensure 'date' is processed correctly as a datetime object
                        if isinstance(date_value, datetime):
                            day_count = (datetime.now() - date_value).days
                        else:
                            raise ValueError("Date is not in datetime format")
                    else:
                        day_count = 'Invalid Date'
                    
                    # Append day count to the row
                    row_with_day_count = dict(row)
                    row_with_day_count['day_count'] = day_count
                    processed_rows.append(row_with_day_count)
                except Exception as row_error:
                    print(f"Error processing row: {row}, Error: {row_error}")
            
            return processed_rows


    def get_allevent():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM timing_plan")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()

    def get_customer_projects(selected_business):
        try:
            connection = get_db_connection()  
            cursor = connection.cursor()

            # Convert the comma-separated values into a list
            business_list = selected_business.split(',') if selected_business else []
            

            query = """
                SELECT customer_name AS customer, SUM(Nos_of_projects) AS count
                FROM details
            """

            params = []
            if business_list:
                placeholders = ','.join(['%s'] * len(business_list))
                query += f" WHERE customer_category IN ({placeholders})"
                params.extend(business_list)

            query += " GROUP BY customer_name"

            cursor.execute(query, tuple(params))
            data = cursor.fetchall()
            cursor.close()
            connection.close()

            return jsonify([{"count": row["count"], "projects": row["customer"]} for row in data])

        except Exception as e:
            return jsonify({"error": "Failed to fetch customer projects", "details": str(e)}), 500
        

    def get_userdata():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM user_data")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()


    def update_projectteam(data):
            ic(data)
            project_id = data.get('project_id')
            pe = ",".join(data.get('pe', [])) if isinstance(data.get('pe'), list) else data.get('pe', '')
            bd = ",".join(data.get('bd', [])) if isinstance(data.get('bd'), list) else data.get('bd', '')
            scm = ",".join(data.get('scm', [])) if isinstance(data.get('scm'), list) else data.get('scm', '')
            td = ",".join(data.get('td', [])) if isinstance(data.get('td'), list) else data.get('td', '')
            plmc = ",".join(data.get('plmc', [])) if isinstance(data.get('plmc'), list) else data.get('plmc', '')
            spm = ",".join(data.get('spm', [])) if isinstance(data.get('spm'), list) else data.get('spm', '')
            pm = ",".join(data.get('pm', [])) if isinstance(data.get('pm'), list) else data.get('pm', '')
            mfg = ",".join(data.get('mfg', [])) if isinstance(data.get('mfg'), list) else data.get('mfg', '')
            lab = ",".join(data.get('lab', [])) if isinstance(data.get('lab'), list) else data.get('lab', '')


            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if pe:
                    update_fields.append("project_eng_team = %s")
                    update_values.append(pe)

                if bd:
                    update_fields.append("business_development_team = %s")
                    update_values.append(bd)

                if scm:
                    update_fields.append("supply_chain_mgmt_team = %s")
                    update_values.append(scm)

                if td:
                    update_fields.append("tool_develop_team = %s")
                    update_values.append(td)

                if plmc:
                    update_fields.append("plmc_team = %s")
                    update_values.append(plmc)

                if mfg:
                    update_fields.append("manufacturing = %s")
                    update_values.append(mfg)

                if spm:
                    update_fields.append("spm_team = %s")
                    update_values.append(spm)

                if pm:
                    update_fields.append("project_mgmt_team = %s")
                    update_values.append(pm)

                if lab:
                    update_fields.append("laboratory = %s")
                    update_values.append(lab)

                # Ensure sl_no is included
                update_values.append(project_id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE details SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    def add_user(data):
        try:
            department = data.get('department')
            name = data.get('name')
            email = data.get('email')
            

            
            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO user_data (name,department,email)
                VALUES (%s, %s,%s)
            """, (name,department,email ))

            connection.commit()
            connection.close()

        except Exception as e:
            return print(e), 500
        
    
    def delete_userdata(data):
        try:
            ic(data)  # Debugging statement

            if not data:
                return jsonify({'error': 'User ID is required'}), 400

            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("DELETE FROM user_data WHERE id = %s", (data,))
            connection.commit()
            connection.close()

            return jsonify({'message': 'User deleted successfully'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def update_user(data):
            id = data.get('id')
            name = data.get('name')  # Use .get() to avoid KeyError
            department = data.get('department')
            email = data.get('email')

            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if name:
                    update_fields.append("name = %s")
                    update_values.append(name)

                if department:
                    update_fields.append("department = %s")
                    update_values.append(department)

                if email:
                    update_fields.append("email = %s")
                    update_values.append(email)

                

                # Ensure sl_no is included
                update_values.append(id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE user_data SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                    ic(id)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    from datetime import datetime

    def createbooking(data):
        try:
            details = data.get('details')
            selectedDate = data.get('selectedDate')
            customername = data.get('customername')
            location = data.get('location')
            remark = data.get('remark')
            type = data.get('type')

            selectedDate = datetime.strptime(selectedDate, "%Y-%m-%dT%H:%M:%S.%fZ")

            # selectedDate += timedelta(days=1)

            selectedDate = selectedDate.strftime("%Y-%m-%d %H:%M:%S")

            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO booking_data (date, event,customer_name,location,remark,visit_type)
                VALUES (%s, %s,%s, %s,%s,%s)
            """, (selectedDate, details,customername,location,remark,type))

            connection.commit()
            connection.close()

            return {"message": "Booking created successfully"}, 201

        except Exception as e:
            return {"error": str(e)}, 500
        
    def get_bookings():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT id, event, date,location,remark,customer_name,visit_type FROM booking_data")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()

    def update_table(data):
            id = data.get('id')
            remark = data.get('remark')  # Use .get() to avoid KeyError

            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if remark:
                    update_fields.append("remark = %s")
                    update_values.append(remark)


                

                # Ensure sl_no is included
                update_values.append(id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE booking_data SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                    ic(id)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    def update_event(data):
            point_id = data.get('point_id')
            id = data.get('id')
            date = data.get('date') 
            status = data.get('status')

            if date:
                date += "-01" 

            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if date:
                    update_fields.append("monthyear = %s")
                    update_values.append(date)

                if status:
                    update_fields.append("status = %s")
                    update_values.append(status)


                

                # Ensure sl_no is included
                update_values.append(point_id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE timing_plan SET {', '.join(update_fields)} WHERE point_id = %s"
                    cursor.execute(query, update_values)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    def add_usermould(data):
        ic(data)
        try:
            segment = data.get('segment')
            name = data.get('name')
            department = data.get('department')
            Access = data.get('Access')
            passw = data.get('passw')
            

            
            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO login (username,segment,department,access,password)
                VALUES (%s, %s,%s,%s,%s)
            """, (name,segment,department,Access,passw ))

            connection.commit()
            connection.close()

        except Exception as e:
            return print(e), 500
        
    
    def delete_userdata(data):
        try:
            if not data:
                return jsonify({'error': 'User ID is required'}), 400

            connection = get_db_connection()
            cursor = connection.cursor()

            cursor.execute("DELETE FROM user_data WHERE id = %s", (data,))
            connection.commit()
            connection.close()

            return jsonify({'message': 'User deleted successfully'}), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def update_usermould(data):
            id = data.get('id')
            name = data.get('name')  # Use .get() to avoid KeyError
            segment = data.get('segment')
            department = data.get('department')
            Access = data.get('Access')
            passw = data.get('passw')


            connection = get_db_connection()
            cursor = connection.cursor()
            try:
                # Build dynamic SQL query based on provided data
                update_fields = []
                update_values = []

                if name:
                    update_fields.append("username = %s")
                    update_values.append(name)

                if segment:
                    update_fields.append("segment = %s")
                    update_values.append(segment)

                if department:
                    update_fields.append("department = %s")
                    update_values.append(department)

                if Access:
                    update_fields.append("access = %s")
                    update_values.append(Access)

                if passw:
                    update_fields.append("password = %s")
                    update_values.append(passw)

                

                # Ensure sl_no is included
                update_values.append(id)

                # Execute the query only if there are fields to update
                if update_fields:
                    query = f"UPDATE login SET {', '.join(update_fields)} WHERE id = %s"
                    cursor.execute(query, update_values)
                else:
                    print("No fields to update.")

                connection.commit()

            except Exception as e:
                print("An error occurred:", e)
                raise e

            finally:
                cursor.close()
                connection.close()

    def get_moulduser():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM login")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()

    def add_master(data):
        cust_name = data.get('cust_name')  
        cust_category = data.get('cust_category')
        zone = data.get('zone')
        plant = data.get('plant')
 
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            # Build dynamic INSERT query
            columns = []
            values = []
            placeholders = []
 
            if cust_name:
                columns.append("customer_name")
                values.append(cust_name)
                placeholders.append("%s")
 
            if cust_category:
                columns.append("customer_category")
                values.append(cust_category)
                placeholders.append("%s")
 
            if zone:
                columns.append("zone")
                values.append(zone)
                placeholders.append("%s")
 
            if plant:
                columns.append("plant")
                values.append(plant)
                placeholders.append("%s")
 
            if columns:
                query = f"INSERT INTO details_master ({', '.join(columns)}) VALUES ({', '.join(placeholders)})"
                cursor.execute(query, values)
                connection.commit()
            else:
                print("No data to insert.")
 
        except Exception as e:
            print("An error occurred:", e)
            raise e
 
        finally:
            cursor.close()
            connection.close()
 
    def get_master():
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM details_master")
                rows = cursor.fetchall()
            return rows
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
        finally:
            if connection:
                connection.close()
 


