<?php
    class Database{
        protected $con;
        protected $host='localhost';
        protected $db_user='root';
        protected $db_password='';
        protected $db_name='mydbworking';

        //Function de la connection :
        public function Connection(){
             $this->con=null;
            try{
                $this->con=new PDO('mysql:host='.$this->host.';dbname='.$this->db_name,
                $this->db_user,$this->db_password);
                $this->con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e){
                echo 'Ooops ! '.$e->getMessage();
            }
            return $this->con;
        }

        //Function pour Afficher Les Messages :
        public function Message($success,$message){
            echo json_encode(array(
                'success'=>$success,
                'Message'=>$message
            ));
        }

        //Function de Login :
        public function Login($email,$password){

            $sql='SELECT * FROM users WHERE Email="'.$email.'" AND Password="'.$password.'";';
            $stmt=$this->con->prepare($sql);
            $stmt->execute();

            return $stmt;

        }

        //Function Pour Recherche Par Email :
        public function SelectByEmail($email){

            $sql='SELECT * FROM users WHERE Email="'.$email.'";';
            $stmt=$this->con->prepare($sql);
            $stmt->execute();
            if($stmt->rowCount()):
                return true;
            endif;

            return false;

        }

        //Function Pour Recherche Par Id :
        public function SelectById($id){

            $sql='SELECT * FROM users WHERE ID='.$id;
            $stmt=$this->con->prepare($sql);
            $stmt->execute();
            return $stmt;

        }

        //Function de la Register :
        public function Register($username,$email,$password){

            $sql='INSERT INTO users (UserName,Email,Password) VALUES("'.$username.'","'.$email.'","'.$password.'")';
            $stmt=$this->con->prepare($sql);

            if($stmt->execute()):
                return true;

            endif;

            echo ''.$stmt->error;
            return false;

        }

        //Function Pour Update User :
        public function Update($id,$username,$email,$password){

            $sql='UPDATE users SET UserName="'.$username.'",Email="'.$email.'",Password="'.$password.'";';
            $stmt=$this->con->prepare($sql);

            if($stmt->execute()):
                return true;

            endif;

            echo ''.$stmt->error;
            return false;

        }

        //Function Pour Delete User :
        public function Delete($id){

            $sql='DELETE FROM  users WHERE ID='.$id;
            $stmt=$this->con->prepare($sql);

            if($stmt->execute()):
                return true;

            endif;

            echo ''.$stmt->error;
            return false;

        }

    }
?>